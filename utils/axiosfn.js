const { default: axios } = require("axios");
const { SDK } = require("../SDK/SDK");
const { SDKLocal } = require('../SDK/SDKLocal');
const { saveLog } = require("../SQLServer/SQL");

const axiosUpdateApertura = async (id, obj) => {
  try {
    const { data } = await SDK.updateApertura(id, obj);
    //se salva el log
    console.log(data);
    saveLog('AperturaCaja', id, data.message, 1, 0);
  } catch (err) {
    console.log(err.response.data);
    //se salva el log
    saveLog('AperturaCaja', id, data.message, 0, 0);
  }
};

const axiosInsertApertura = async (obj, id) => {
  try {
    const { data } = await SDK.apertura(obj);
    console.log(data.message, '21');
    saveLog('AperturaCaja', id, data.message, 1, 0);
    //se salva el log
  } catch (err) {
    console.log(err.response.data);
    //se salva el log
    saveLog('AperturaCaja', id, data.message, 0, 0);
  }
}

const getInfo = async (id) => {
  try {
    const { data } = await SDKLocal.getInfo(id);
    return data.datas;
  } catch (err) {
    console.log(err.response, '20')
  }
};

const getidTienda = async ()=>{
  try{
    const {data} =  await SDKLocal.getInfoTienda();
    console.log(data, 'data')

    return data.datas[0].valor;
    
  }catch(err){
    console.log(err, '--')
    return false
  } 
}


module.exports = {
  axiosUpdateApertura,
  getInfo,
  axiosInsertApertura,
  getidTienda
};
