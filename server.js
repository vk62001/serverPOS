require('dotenv').config();
const express = require("express");
const socket = require("socket.io");
const { getTable } = require('./SQLServer/SQL');

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

// Static files
app.use(express.static("public"));



app.get('/', async (req, res) => {
  
    const query =  await getTable('sq');
    console.log(query);
    res.status(200).send({data: query});
})

// Socket setup
const io = socket(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");
});