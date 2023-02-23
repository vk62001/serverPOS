const {SDK} = require("../SDK/SDK");
const {SDKLocal} = require('../SDK/SDKLocal');

const axiosUpdateApertura = async (id, obj) => {
  try {
    const {data} = await SDK.updateApertura(id, obj);
    //se salva el log
    console.log(data);
  } catch (err) {
    console.log(err.response.data);
    //se salva el log
  }
};


const getInfo = async (id) => {
    try{
        const {data} = await SDKLocal.getInfo(id);
        return data.datas;
    }catch(err){
        console.log(err.response, '20')
    }
}

module.exports = {
    axiosUpdateApertura,
    getInfo
};
