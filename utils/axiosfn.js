const { SDK } = require("../SDK/SDK");
const { SDKLocal } = require("../SDK/SDKLocal");
const { saveLog } = require("../SQLServer/SQL");

const axiosInsertData = async (endPoint, obj, id) => {
  try {
    const { data } = await SDK.insertData(endPoint, obj);
    console.log(data.message, "21", id);
    saveLog(endPoint, id, data.message, 1, 0);
    //se salva el log
  } catch (err) {
    //err.code  === 'ECONNREFUSED' no hay conexion con server
    console.log(err);
    console.log(err.response.data, "12");

    //se salva el log
    saveLog(endPoint, id, err.response.data.message, 0, 0);

    // console.log(err.response);
    // console.log("Error updating" + err.response.status + " .");
    // if (err.response.status != 405) {
    //   saveLog("RetirosCaja", id, data.message, 0, 0);
    // }
  }
};

const axiosUpdateData = async (endPoint, id, obj) => {
  try {
    const { data } = await SDK.updateData(endPoint, id, obj);
    //se salva el log
    console.log(data, '--');
    saveLog(endPoint, id, data.message, 1, 0);
  } catch (err) {
    console.log(err.response.data, '34');
    //se salva el log
    saveLog(endPoint, id, err.response.data.message, 0, 0);
  }
};

const getInfo = async (proceso, id) => {
  try {
    const { data } = await SDKLocal.getInfo(proceso, id);
    return data.datas;
  } catch (err) {
    console.log(err.response, "20");
  }
};

const getIdTienda = async () => {
  try {
    const { data } = await SDKLocal.getInfoTienda();
    return data.datas[0].valor;
  } catch (err) {
    console.log(err);
    return false;
  }
};
/*
const axiosUpdateApertura = async (id, obj) => {
  try {
    const { data } = await SDK.updateApertura(id, obj);
    //se salva el log
    console.log(data);
    saveLog("AperturasTiendas", id, data.message, 1, 0);
  } catch (err) {
    console.log(err.response.data);
    //se salva el log
    saveLog("AperturasTiendas", id, data.message, 0, 0);
  }
};

const axiosInsertApertura = async (obj, id) => {
  try {
    const { data } = await SDK.apertura(obj);
    console.log(data.message, "21", id);
    saveLog("AperturasTiendas", id, data.message, 1, 0);
    //se salva el log
  } catch (err) {
    console.log(err.response.data);
    //se salva el log
    saveLog("AperturasTiendas", id, data.message, 0, 0);
  }
};

const axiosUpdateDepositos = async (id, obj) => {
  try {
    const { data } = await SDK.updateDeposito(id, obj);
    console.log(data.message, "21");
    saveLog("Depositos", id, data.message, 1, 0);
    //se salva el log
  } catch (err) {
    console.log(err.response);
    console.log("Error updating" + err.response.status + " .");
    if (err.response.status != 405) {
      //se salva el log
      saveLog("Depositos", id, data.message, 0, 0);
    }
  }
};

const axiosIsertDepositos = async (obj, id) => {
  try {
    const { data } = await SDK.deposito(obj);
    console.log(data.message, "21");
    saveLog("Depositos", id, data.message, 1, 0);
    //se salva el log
  } catch (err) {
    console.log(err.response.data);
    //se salva el log
    saveLog("Depositos", id, data.message, 0, 0);
  }
};

const axiosInsertHistorialCajero = async (obj, id) => {
  try {
    console.log(obj, "-", id, "historial");
    const { data } = await SDK.historialCajero(obj);
    console.log(data.message, "21");
    saveLog("HistorialesCajeros", id, data.message, 1, 0);
  } catch (err) {
    console.log(err.response.data);
    saveLog("HistorialesCajeros", id, data.message, 0, 0);
  }
};

const axiosUpdateHistorialCajero = async (id, obj) => {
  try {
    const { data } = await SDK.updatehistorialCajero(id, obj);
    console.log(data.message, "21");
    saveLog("HistorialesCajeros", id, data.message, 1, 0);
  } catch (err) {
    console.log(err.response);
    console.log("Error updating" + err.response.status + " .");
    if (err.response.status != 405) {
      saveLog("HistorialesCajeros", id, data.message, 0, 0);
    }
  }
};

const axiosInsertRetiroCaja = async (obj, id) => {
  try {
    console.log(obj, "-", id, "retiroCaja");
    const { data } = await SDK.retiroCaja(obj);
    console.log(data.message, "21");
    saveLog("RetirosCaja", id, data.message, 1, 0);
  } catch (err) {
    console.log(err.response.data);
    saveLog("RetirosCaja", id, data.message, 0, 0);
  }
};

const axiosUpdateRetiroCaja = async (id, obj) => {
  try {
    const { data } = await SDK.updateReiroCaja(id, obj);
    console.log(data.message, "21");
    saveLog("RetirosCaja", id, data.message, 1, 0);
  } catch (err) {
    console.log(err.response);
    console.log("Error updating" + err.response.status + " .");
    if (err.response.status != 405) {
      saveLog("RetirosCaja", id, data.message, 0, 0);
    }
  }
};

const axiosInsertRemesas = async (obj, id) => {
  try {
    console.log(obj, "-", id);
    const { data } = await SDK.remesas(obj);
    console.log(data.message, "21");
    saveLog("Remesas", id, data.message, 1, 0);
  } catch (err) {
    console.log(err.response.data);
    saveLog("Remesas", id, data.message, 0, 0);
  }
};

const axiosUpdateRemesas = async (id, obj) => {
  try {
    const { data } = await SDK.updateRemesas(id, obj);
    console.log(data.message, "21");
    saveLog("Remesas", id, data.message, 1, 0);
  } catch (err) {
    console.log(err.response);
    console.log("Error updating", err.response.status, " .");
    if (err.response.status != 405) {
      saveLog("Remesas", id, data.message, 0, 0);
    }
  }
};

const axiosInsertTicketsRemesas = async (obj, id) => {
  try {
    console.log(obj, "-", id, "ITicketsRemesas");
    const { data } = await SDK.insertData("TicketsRemesas", obj);
    console.log(data.message, "21");
    saveLog("TicketsRemesas", id, data.message, 1, 0);
  } catch (err) {
    console.log(err.response.data);
    saveLog("TicketsRemesas", id, data.message, 0, 0);
  }
};

const axiosUpdateTicketsRemesas = async (id, obj) => {
  try {
    const { data } = await SDK.updateData("TicketsRemesas", id, obj);
    console.log(data.message, "21");
    saveLog("TicketsRemesas", id, data.message, 1, 0);
  } catch (err) {
    console.log(err.response);
    saveLog("TicketsRemesas", id, data.message, 0, 0);
  }
};
*/
module.exports = {
  getInfo,
  getIdTienda,
  axiosInsertData,
  axiosUpdateData,
};
