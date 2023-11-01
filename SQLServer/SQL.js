"use strict";

const sql = require("mssql");
const config = require("./config");
const axios = require("axios");
const { delay } = require("../utils/utils");

const getTable = async (table) => {
  const poolConnection = await sql.connect(config);
  try {
    var resultSet = await poolConnection
      .request()
      .query(`SELECT * FROM ${table}`);
    return resultSet;
  } catch (err) {
    console.error(err.message);
  }
  poolConnection.close();
};

// const pool = new sql.ConnectionPool(config);
// pool
//   .connect()
//   .then(() => {
//     console.log("Conexión a SQL Server establecida");
//   })
//   .catch((err) => {
//     console.log("Error al conectar a SQL Server:", err);
//   });

// // Para cerrar la conexión cuando tu aplicación se detenga
// process.on("SIGINT", () => {
//   pool.close().then(() => {
//     console.log("Conexión a SQL Server cerrada");
//     process.exit(0);
//   });
// });

const saveLog = async (spName, id, process, estatus, opc) => {
  // sql.on("error", (err) => {
  //   // ... error handler
  //   console.log(err, 23);
  // });

  const pool = await new sql.ConnectionPool(config).connect();
  const request = pool.request();

  const result = await request
    .input("Proceso", spName)
    .input("Id", id)
    .input("Mensage", process)
    .input("Estatus", estatus)
    .input("Opc", opc)
    .execute("sqsp_GuardaLogComunicacionIssp");

  console.log(result.rowsAffected, "Guardo");
  await pool.close();
  // sql
  //   .connect(config)
  //   .then((pool) => {
  //     // Stored procedure
  //     return pool
  //       .request()
  //       .input("Proceso", spName)
  //       .input("Id", id)
  //       .input("Mensage", process)
  //       .input("Estatus", estatus)
  //       .input("Opc", opc)
  //       .execute("sqsp_GuardaLogComunicacionIssp");
  //   })
  //   .then((result) => {
  //     console.dir(result.rowsAffected, "Guardo");
  //   })
  //   .catch((err) => {
  //     console.log(err, 45);
  //   });
  /* ########### */
  // console.log("Llegue", 1000);
  // delay(100);
  // const poolConnection = await sql.connect(config);
  // poolConnection.setMaxListeners(15);
  // try {
  //   if (!poolConnection._connected) return;
  //   const data = await saveData(
  //     poolConnection,
  //     spName,
  //     id,
  //     process,
  //     estatus,
  //     opc
  //   );
  //   console.log(
  //     data ? "true" : `${spName}, ${id}, ${process}, ${estatus}, ${opc}`
  //   );
  //   // console.log(poolConnection._connected);
  // } catch (err) {
  //   // poolConnection.close();
  //   console.log(err, "error de conexión");
  // }
  // poolConnection.close();
};

// const saveData = (connection, spName, id, process, status, opc) => {
//   console.log(connection._connected, 48);

//   if (!connection._connected) return;
//   return new Promise(async (resolve, reject) => {
//     try {
//       delay(500);
//       await connection
//         .request()
//         .input("Proceso", spName)
//         .input("Id", id)
//         .input("Mensage", process)
//         .input("Estatus", status)
//         .input("Opc", opc)
//         .execute("sqsp_GuardaLogComunicacionIssp");
//       resolve(true);
//     } catch (error) {
//       console.log(error, 64);
//       reject(false);
//     }
//   });
// };

module.exports = {
  getTable,
  saveLog,
};
