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
  try {
    const result = await request
      .input("Proceso", spName)
      .input("Id", id)
      .input("Mensage", process)
      .input("Estatus", estatus)
      .input("Opc", opc)
      .execute("sqsp_GuardaLogComunicacionIssp");

    // console.log(result.rowsAffected, "Guardo");
  } catch (err) {
    console.table(err.originalError);
  }
  pool.close();
};

const getLog = async () => {
  const poolConnection = await new sql.ConnectionPool(config).connect();
  const request = poolConnection.request();
  try {
    var resultLog = await request.query(
      `select id, Proceso_Origen, tienda_id, Proceso_Origen_Id, Mensage, estatus, date_created from SQT_LogComunicacion where estatus = 0  order by date_created asc `
    );
    return resultLog;
  } catch (err) {
    console.error(err.message);
  }
  await poolConnection.close();
};

module.exports = {
  getTable,
  saveLog,
  getLog,
};
