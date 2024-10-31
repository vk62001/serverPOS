require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getTable, getLog, saveLog } = require("./SQLServer/SQL");
const apiRouter = require("./routes");
const { io } = require("socket.io-client");
const { SDKLocal } = require("./SDK/SDKLocal");
const { mappingErrors, processesCentralData } = require("./utils/axiosfn");
const { delay } = require("./utils/utils");
const axios = require("axios");
const cron = require("node-cron");
const { getSocketInit, setSocketInit } = require("./utils/globalVars");

let socket;
let flagLog = false;
// App setup
const PORT = 5001;
const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

// Static files
app.use(express.static("public"));

//rutas

app.use("/api/", apiRouter);

app.get("/", async (req, res) => {
  var { version } = require("./package.json");
  console.log(version);

  const query = await getTable("sqt_configuracion");
  const valueConf = query.recordset.filter((item) => item.clave === "NOTIENDA");

  res
    .status(200)
    .send({ Tienda: valueConf[0].valor, "Version del Servicio": version });
});

const cronLog = async () => {
  let result = 0;
  // // do {
  const getDataLog = await getLog();
  if (getDataLog.recordset.length) {
    result = await mappingErrors(getDataLog.recordset);
    // console.table(getDataLog.recordset);
    console.log(
      `${result} de ${getDataLog.recordset.length} logs no procesado cron`
    );
    // } while (result > 0);
    // console.table({ Resultado: "todoos procesado" });
  }
};

// Configura el cron job para que se ejecute cada 3 minutos
cron.schedule("*/3 * * * *", () => {
  if (flagLog) {
    cronLog();
  }
});

// Configura el cron job para que se ejecute cada 2 minutos
cron.schedule("*/s * * * *", () => {
  if (!socket.connected) {
    socket.close();
    start();
  }
});

const useSocket = (tiendaId, listaPrecios) => {
  const URi = process.env.Uri_sockets;
  console.log(URi);

  socket = io.connect(URi, {
    query: {
      tienda: tiendaId,
      room: "kernel",
      listaPrecios: `${listaPrecios}`,
    },
    reconnection: true, // Habilita la reconexión automática
    reconnectionAttempts: Infinity, // Número máximo de intentos de reconexión
    reconnectionDelay: 1000, // defaults to 1000
    reconnectionDelayMax: 5000, // defaults to 5000
    transports: ["websocket"],
    upgrade: false,
    pingInterval: 10000, // how often to ping/pong.
    pingTimeout: 30000, // how long until the ping times out.
    randomizationFactor: 0.5, // Factor de aleatoriedad para el tiempo de reconexión
  });

  socket.on("connect", async () => {
    console.log("connected", Date(), socket.id);
    //id de tienda
    //revisar el log y el rollback
    let result = 0;
    // // do {
    const getDataLog = await getLog();
    if (!getDataLog) return;
    result = await mappingErrors(getDataLog.recordset);
    // console.table(getDataLog.recordset);
    console.log(
      `${result} de ${getDataLog.recordset.length} logs no procesado in connected`
    );
    // } while (result > 0);
    console.table({ Resultado: "Todo procesado" });
    flagLog = true;
  });

  setSocketInit(socket);

  socket.on("reconnection_attempt", async () => {
    let result = 0;
    // do {
    const getDataLog = await getLog();
    result = await mappingErrors(getDataLog.recordset);
    // console.table(getDataLog.recordset);
    console.log(result, "logs no procesado");
    // } while (result > 0);
    console.table({ Resultado: "Todo procesado" });
    flagLog = true;
  });

  socket.on("getCountRegistrosPOS", async (e) => {
    try {
      // console.log("pedimos tablas locales");
      const { data } = await SDKLocal.getInfo("CountRegistros", tiendaId);
      // console.log(data);
      socket.emit("setCountRegistros", { registros: data.data, e }); //Se envia la informacion a central
    } catch (err) {
      console.log(err);
      socket.emit("setCountRegistros", { registros: [], e }); //Se envia la informacion a central
    }
  });

  socket.on("getExistenciasPOS", async (e) => {
    try {
      const { data } = await SDKLocal.getInfo(
        "ExistenciasTiendas/ByTienda",
        e.tiendaId
      );
      socket.emit("setExistencias", { data: data.datas }); //Se envia la informacion a central
    } catch (err) {
      console.log(err);
      socket.emit("setExistencias", { data: [] }); //Se envia la informacion a central
    }
  });
  socket.on("getExistenciasPOSWA", async (e) => {
    try {
      const { data } = await SDKLocal.getInfoFilter(
        "ExistenciasTiendas/ByFilter",
        e.tienda,
        e.textUser
      );
      socket.emit("setExistenciasWA", { data: data.datas }); //Se envia la informacion a central
    } catch (err) {
      console.log(err);
      socket.emit("setExistenciasWA", { data: [] }); //Se envia la informacion a central
    }
  });
  /* 
    solicitud de dataLog manualmente desde Central
  */
  socket.on("getDataLogManually", async (e) => {
    const getDataLog = await getLog(true);
    if (!getDataLog) return;
    const result = await mappingErrors(getDataLog.recordset);
    // console.table(getDataLog.recordset);
    console.log(result, "fin del log");
    // socket.emit("setDataLogManually", {
    //   data: result + " logs no procesados",
    //   e,
    // });
    const { data } = await SDKLocal.getInfo("CountRegistros", tiendaId);
    // console.log(data);
    socket.emit("setCountRegistros", { registros: data.data, e: e.e }); //Se envia la informacion a central
  });

  socket.on("disconnect", async (reason, details) => {
    console.log(reason, socket.connected);
    console.table(details);
    flagLog = false;
  });


  socket.on("connect_error", (err) => {
    console.error(`connect_error due to ${err.message}`);
  });

  socket.on("callBack", async (data) => {
    await delay(100);
    // const decompressedData = zlib.gunzipSync(data).toString();
    // const dataTemp = JSON.parse(decompressedData);
    // console.log("regrso bien!", data);
    const { endPoint, id, message, estatus, opc, uuid } = data;
    saveLog(endPoint, id, message, estatus, opc, uuid);
  });
  socket.emit("test");
  // socket.on("reconnect", (attemptNumber) => {
  //   console.log("Reconnected successfully on attempt", attemptNumber);
  // });

  // socket.on("error", (error) => {
  //   console.error("Socket.IO error:", error);
  // });

  // socket.on("connect_error", (error) => {
  //   console.error("Socket.IO connect error:", error);
  // });

  socket.on("receiveData", async (objData, resolve) => {
    console.log(socket.id, "socket id ");
    console.log("Legga data", objData);
    const { endPoint, id, message, estatus, opc, uuid, method, data } = objData;
    // saveLog(endPoint, id, message, estatus, opc, uuid);
    const response = await processesCentralData(
      endPoint,
      id,
      data,
      // tienda,
      method
    );
    response.uuid = uuid;

    // sendDataToCentral(endPoint, id, uuid, response);
    // console.log(response, socketTienda[0]?.id);
    setTimeout(() => {
      console.log("resuelto", response);
      resolve(response);
    }, 5000);
  });
};
const sendDataToCentral = async (endPoint, id, uuid, response) => {
  try {
    const socket = getSocketInit();
    socket.emit("callBack", response);
  } catch (e) {
    console.error("sendDataToTienda:", endPoint, id, e);
    const { message, estatus } = response;
    saveLog(endPoint, id, message, estatus, 0, uuid, tienda);
  }
};

const iteracion = async (max = 20, intervalo = 20000) => {
  const url = `${process.env.URi_local}api/v1/Configuraciones`;
  console.log(url, "85 -- Iterando ", Date());
  for (let i = 0; i < max; i++) {
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Basic ${process.env.credentials}`,
          "Content-Type": "application/json",
        },
      });
      console.log(data.datas[0], 94);
      return data.datas[0];
    } catch (error) {
      console.log("error, iteración no: ", i, error, Date());
      if (error.response) {
        if (error.response.data.message) {
          console.log(
            error.response.data.message,
            "error.response.data.message"
          );
        } else {
          // El servidor respondió con un código de estado fuera del rango 2xx
          console.error(
            "Respuesta de error del servidor:",
            error.response.status,
            error.response.statusText
          );
        }
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor:", error.message);
      } else {
        // Error desconocido
        console.error("Error desconocido:", error.message);
      }
      await delay(intervalo);
      flagLog = false;
    }
  }
  throw new Error("No sirve esta chingadera");
};
// let tiendaId
const start = async () => {
  iteracion()
    .then(({ valor, usuario_modifica_id: listaPrecios }) => {
      console.log(valor, listaPrecios, "Socket Conectado ", Date());
      // tiendaId = res;
      useSocket(valor, listaPrecios);
    })
    .catch((err) => console.log("no sirve esta mamada", Date()));
};
start();
