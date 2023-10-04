require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getTable } = require("./SQLServer/SQL");
const apiRouter = require("./routes");
const { io } = require("socket.io-client");
const { SDKLocal } = require("./SDK/SDKLocal");
const { getidTienda } = require("./utils/axiosfn");
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
  const query = await getTable("sq");
  res.status(200).send({ data: query });
});

const useSocket = (idTienda) => {
  const URi = process.env.URi_sockets;
  console.log(URi);

  const socket = io.connect(URi, {
    query:{
      tienda:idTienda,
      room:'zona_norte'
    },
    transports: ["websocket"],
    upgrade: false,
  });
  
  socket.on("connect", async () => {
    console.log("connected");
    //id de tienda
  });

  socket.on('getCountRegistrosPOS',async (e)=>{
    console.log('pedimos tablas locales')
    const datosTablas = await SDKLocal.getTablas();
    socket.emit('setCountRegistros', {registros:datosTablas.data.data, e});
  });

  socket.emit('test');

};

const start = async () => {
  const idTienda = await getidTienda();
  if(!idTienda){
    //alerta si no hay conexión
    return;
  }
  useSocket(idTienda);
}

start();

