"use strict";

const sql = require("mssql");
const config = require("./config");
const axios = require("axios");

const getTable = async (table) => {
  const poolConnection = await sql.connect(config);
  try {
    var resultSet = await poolConnection
      .request()
      .query(`SELECT * FROM ${table}}`);

    return resultSet;
  } catch (err) {
    console.error(err.message);
  }
  poolConnection.close();
};

const saveLog = async (spName, id, process, estatus, opc) => {
  console.log("Llegue", 1000);
  const poolConnection = await sql.connect(config);
  try {
    await poolConnection
      .request()
      .input("Proceso", spName)
      .input("Id", id)
      .input("Mensage", process)
      .input("Estatus", estatus)
      .input("Opc", opc)
      .execute("sqsp_GuardaLogComunicacionIssp");
    console.log("fin procediminto log");
  } catch (err) {
    console.error(err.message);
  }
  poolConnection.close();
};

module.exports = {
  getTable,
  saveLog,
};
