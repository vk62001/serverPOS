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

const saveLog = async (spName, id, process, estatus, opc, uuid) => {
  // console.log("Parametros ", spName, id, process, estatus, opc, uuid);
  const pool = await new sql.ConnectionPool(config).connect();
  const request = pool.request();
  try {
    await request
      .input("Id", uuid)
      .input("Proceso", spName)
      .input("ProcessId", id)
      .input("Mensage", process)
      .input("Estatus", estatus)
      .input("Opc", opc)
      .execute("sqsp_GuardaLogComunicacionIssp");
  } catch (err) {
    console.table(err);
  }
  pool.close();
};

const getLog = async (manualy = false) => {
  const poolConnection = await new sql.ConnectionPool(config).connect();
  const request = poolConnection.request();
  try {
    const resultLog = await request.query(
      `select id, Proceso_Origen, tienda_id, Proceso_Origen_Id, Mensage, estatus, date_created from SQT_LogComunicacionSockets WITH(NOLOCK) where estatus = 0  order by date_created asc `
    );
    // console.log("antes delayed");
    !manualy && (await new Promise((resolve) => setTimeout(resolve, 60000)));
    // console.log("despues delayed");
    return resultLog;
  } catch (err) {
    console.error(err.message, Date());
  }
  await poolConnection.close();
};

module.exports = {
  getTable,
  saveLog,
  getLog,
};
