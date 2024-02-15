require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getTable, getLog, getInfo } = require("./SQLServer/SQL");
const apiRouter = require("./routes");
const { io } = require("socket.io-client");
const { SDKLocal } = require("./SDK/SDKLocal");
const { mappingErrors } = require("./utils/axiosfn");
const { delay } = require("./utils/utils");
const axios = require("axios");

let socket;
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
  const query = await getTable("sqt_configuracion");
  // console.log(query,'--');
  res.status(200).send({ data: query });
});

const useSocket = (idTienda) => {
  const URi = process.env.URi_sockets;
  // console.log(URi);

  socket = io.connect(URi, {
    query: {
      tienda: idTienda,
      room: "kernel",
    },
    reconnectionDelay: 10000, // defaults to 1000
    reconnectionDelayMax: 10000, // defaults to 5000
    transports: ["websocket"],
    upgrade: false,
    pingInterval: 10000, // how often to ping/pong.
    pingTimeout: 60000, // how long until the ping times out.
  });

  socket.on("connect", async () => {
    console.log("connected", Date());
    //id de tienda
    //revisar el log y el rollback
    let result = 0;
    // do {
    const getDataLog = await getLog();
    result = await mappingErrors(getDataLog.recordset);
    // console.table(getDataLog.recordset);
    console.log(
      `${result} de ${getDataLog.recordset.length} logs no procesado`
    );
    // } while (result > 0);
    console.table({ Resultado: "Todo procesado" });
  });

  socket.on("reconnection_attempt", async () => {
    let result = 0;
    // do {
    const getDataLog = await getLog();
    result = await mappingErrors(getDataLog.recordset);
    // console.table(getDataLog.recordset);
    console.log(result, "logs no procesado");
    // } while (result > 0);
    console.table({ Resultado: "Todo procesado" });
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
  /* 
    solicitud de dataLog manualmente desde Central
  */
  socket.on('getDataLogManually', async () => {
    const getDataLog = await getLog();
    socket.emit("setDataLogManually", { data: getDataLog.recordset });
  });

  socket.on("disconnect", (reason, details) => {
    console.log(reason, details, "desconexión");
  });

  socket.emit("test");
};

const iteracion = async (max = 12, intervalo = 15000) => {
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
      // console.log(data.datas[0].valor, 94);
      return data.datas[0].valor;
    } catch (error) {
      console.log("error, iteración no: ", i, error, Date());
      if (error.response) {
        if (error.response.data.message) {
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
    }
  }
  throw new Error("No sirve esta chingadera");
};

const start = async () => {
  iteracion()
    .then((res) => {
      console.log(res, "Socket Conectado ", Date());
      tiendaId = res;
      useSocket(res);
    })
    .catch((err) => console.log("no sirve esta mamada", Date()));
};
start();

// const check = async () => {
//   console.log("entra check");
//   try {
//     const {data} = await axios.get('http://192.168.192.45:5003/');
//     console.log(data, "data ", new Date());
//     if(data.data==='hola'){
//       console.log("Todo bien, todo correcto", new Date());
//       // const getDataLog = await getLog();
//       // const result = await mappingErrors(getDataLog.recordset);
//       // console.table(getDataLog.recordset);
//       console.log("procesado");
//       return;
//     }
//     console.log('no es hola', new Date());
//   } catch (error) {
//     console.log(error.code)
//     if(error.code==="ETIMEDOUT" || error.code==="EHOSTDOWN"){
//       console.log(error.message, Date());
//       await delay(5000);
//       check();
//     }
//   }
// }

// check();