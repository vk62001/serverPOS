require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getTable } = require("./SQLServer/SQL");
const apiRouter = require("./routes");
const { io } = require("socket.io-client");
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

const useSocket = () => {
  const URi = "http://192.168.100.97:5002";
  const socket = io.connect(URi, {
    transports: ["websocket"],
    upgrade: false,
  });

  socket.on("connection", () => {
    console.log("connected");
  });
};

useSocket();
