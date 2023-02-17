require('dotenv').config();
const express = require("express");
const cors = require('cors');
const socket = require("socket.io");
const { getTable } = require('./SQLServer/SQL');
const  apiRouter = require('./routes');
// App setup
const PORT = 5001;
const app = express();
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

// Static files
app.use(express.static("public"));

//rutas

app.use('/api/', apiRouter)

app.get('/', async (req, res) => { 
    const query =  await getTable('sq');
    res.status(200).send({data: query});
})

// Socket setup
const io = socket(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");

  //verificar conexiones y crear controller para recorrido,
});