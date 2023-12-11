require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getTable, getLog } = require("./SQLServer/SQL");
const apiRouter = require("./routes");
const { io } = require("socket.io-client");
const { SDKLocal } = require("./SDK/SDKLocal");
const { getIdTienda, mappingErrors } = require("./utils/axiosfn");
const { delay } = require("./utils/utils");
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

  const socket = io.connect(URi, {
    query: {
      tienda: idTienda,
      room: "kernel",
    },
    transports: ["websocket"],
    upgrade: false,
  });

  socket.on("connect", async () => {
    // console.log("connected");
    //id de tienda
    //revisar el log y el rollback
    let result = 0;
    do {
      const getDataLog = await getLog();
      result = await mappingErrors(getDataLog.recordset);
      // console.table(getDataLog.recordset);
      console.log(result, "logs no procesado");
    } while (result > 0);
    console.table({ Resultado: "Todo procesado" });
  });


  socket.on("reconnection_attempt", async () => {
    let result = 0;
    do {
      const getDataLog = await getLog();
      result = await mappingErrors(getDataLog.recordset);
      // console.table(getDataLog.recordset);
      console.log(result, "logs no procesado");
    } while (result > 0);
    console.table({ Resultado: "Todo procesado" });
  });


  socket.on("getCountRegistrosPOS", async (e) => {
    // console.log("pedimos tablas locales");
    const datosTablas = await SDKLocal.getTablas();
    socket.emit("setCountRegistros", { registros: datosTablas.data.data, e });
  });

  socket.emit("test");
};

const start = async () => {
  const idTienda = await getIdTienda();
  if (!idTienda) {
    //alerta si no hay conexiónva
    return;
  }
  useSocket(idTienda);
};

delay(90000);
start();
