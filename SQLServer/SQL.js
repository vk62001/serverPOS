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

const saveLog = async (spName, id, process, estatus, opc) => {
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
  } catch (err) {
    console.table(err);
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
    console.error(err.message, Date());
  }
  await poolConnection.close();
};

const getInfo = async (tiendaId) => {
  // const poolConnection = await sql.connect(config);
  // try {
  //   const { recordset } = await poolConnection
  //     .request()
  //     .input("IdTienda", 334)
  //     .input("Opc", 0)
  //     .execute("SQSP_ConteoComunicacion");
  //   //  console.log(recordset, 59);

  //   return recordset;
  // } catch (err) {
  //   console.error(err.message);
  // }
  // poolConnection.close();

  const pool = await sql.connect(config);

  try {
    const data = await pool
      .request()
      .input("id", tiendaId)
      .input("Source", "")
      .input("AperturasTiendas", 0)
      .input("HistorialesCajeros", 0)
      .input("Ventas", 0)
      .input("DevolucionesVentas", 0)
      .input("TicketsRemesas", 0)
      .input("Remesas", 0)
      .input("Pedidos", 0)
      .input("PedidosProveedor", 0)
      .input("Devoluciones", 0)
      .input("Depositos", 0)
      .input("RetirosCaja", 0)
      .input("FacturasAjustesInventarios", 0)
      .input("Ajustes", 0)
      .input("Inventarios", 0)
      .input("Cupones", 0)
      .input("Kardex", 0)
      .input("opcion", 3)
      .input("Result", 0)
      .execute("SQCOM_CountRegistros");
    console.log(data.recordsets);
    return data;
  } catch (err) {
    console.log(err);
  }
  pool.close();
};
module.exports = {
  getTable,
  saveLog,
  getLog,
  getInfo,
};
