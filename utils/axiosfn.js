const { default: axios } = require("axios");
const { SDK } = require("../SDK/SDK");
const { SDKLocal } = require("../SDK/SDKLocal");
const { saveLog, getLog } = require("../SQLServer/SQL");
const { eliminarPropiedadesVacias, delay } = require("./utils");
// const { socket } = require("./globalVars");

const crypto = require("crypto");
const { getSocketInit } = require("./globalVars");

const socketInsertData = async (endPoint, obj, id, uuid) => {
  const socket = getSocketInit();
  const objData = {
    data: obj,
    endPoint,
    id,
    tienda: socket.io.opts.query.tienda,
    method: "POST",
    uuid,
  };
  await new Promise(async (resolve) => {
    // console.log(objData);
    await socket.emit("sendData", objData, resolve);
    //saveLog(endPoint, id, "enviado desde Socket", null, 0);
  });
};

const socketUpdateData = async (endPoint, id, obj, uuid) => {
  const socket = getSocketInit();
  const objData = {
    data: obj,
    endPoint,
    id,
    tienda: socket.io.opts.query.tienda,
    method: "PUT",
    uuid,
  };
  await new Promise(async (resolve) => {
    // console.table(socket.id);
    await socket.emit("sendData", objData, resolve);
    //saveLog(endPoint, id, "enviado desde Socket", null, 0);
  });
};

const getInfo = async (proceso, id, reproceso = false) => {
  try {
    if (
      !reproceso &&
      (proceso === "Devoluciones" ||
        proceso === "DevolucionesVentas" ||
        proceso === "Inventarios" ||
        proceso === "Pedidos" ||
        proceso === "PedidosProveedor" ||
        proceso === "Ventas" ||
        proceso === "Ajustes")
    ) {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const { data } = await SDKLocal.getInfo(proceso, id);
            resolve(data.datas);
          } catch (err) {
            reject(err);
          }
        }, 50000);
      });
      // console.log(`${proceso} Espera a reproceso`);
      // saveLog(proceso, id, "primera vez", 0, 0);
      // return [];
    }
    // console.log("otro proceso");
    // else {
    const { data } = await SDKLocal.getInfo(proceso, id);
    return data.datas;
    // }
  } catch (err) {
    console.log(err, "71 - getInfo", Date());
    return [];
  }
};

const getIdTienda = async () => {
  try {
    const { data } = await SDKLocal.getInfoTienda();
    return data.datas[0].valor;
  } catch (err) {
    console.log(err, "80 - getIdTienda", Date());
    return false;
  }
};

/**
 * Post request Log to Central
 * @params array
 * @returns {Promise<*>}
 *
 */
const mappingErrors = async (data) => {
  const numberArray = data.length;
  let numberSuccess = 0;

  const processElement = async (element) => {
    // console.log(element);
    const { Proceso_Origen, Proceso_Origen_Id, id } = element;
    try {
      const procesoID =
        Proceso_Origen === "CountRegistros" ? "" : Proceso_Origen_Id;

      const responseLocal = await SDKLocal.getInfo(Proceso_Origen, procesoID);
      // console.log(responseLocal.data, 83);
      const dataSend =
        Proceso_Origen === "CountRegistros"
          ? responseLocal.data.data
          : eliminarPropiedadesVacias(responseLocal.data.datas[0]);

      const socket = getSocketInit();
      const objData = {
        data: dataSend,
        endPoint: Proceso_Origen,
        id: procesoID,
        tienda: socket.io.opts.query.tienda,
        method: "PUT",
        uuid: id,
      };
      // console.log(objData, "91 - processElement", Date());
      await new Promise(async (resolve) => {
        // console.log(socket.id);
        await socket.emit("sendData", objData, resolve);
        numberSuccess++;
      });
    } catch (error) {
      console.log(
        "mappingErrors",
        Proceso_Origen,
        Proceso_Origen_Id,
        id,
        "Error: ",
        error
      );
    }
  };

  for (const element of data) {
    await processElement(element); // Espera a que se complete la operación antes de continuar con el siguiente elemento
  }

  return numberArray - numberSuccess;
};

const processesCentralData = async (endPoint, id, obj, method) => {
  console.log(endPoint, id, method, "Procesando datos");

  const objCallback = {
    endPoint,
    id,
    message: `${method} SUCCESS`,
    estatus: 1,
    opc: 1,
  };
  try {
    const { data } =
      method === "POST"
        ? await SDKLocal.insertData(endPoint, obj)
        : await SDKLocal.updateData(endPoint, id);
    if (typeof data.message === "undefined" || data.message === null) {
      console.log("Error:", data);
      objCallback.message = "PUT error ";
      objCallback.estatus = 0;
      return objCallback;
    } else {
      console.log(`${method} SUCCESS`, endPoint, id, Date());
      return objCallback;
    }
  } catch (error) {
    let messageError = "";
    // console.log(error, `${method} axiosError`, Date());

    // console.log(socketTienda[0]);
    if (error.response) {
      messageError = error.response.data
        ? error.response.data.message
        : error.response.statusText; //.data.message;
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error(
        "Respuesta de error del servidor:",
        messageError,
        Date(),
        1
      );
    } else if (error.request) {
      messageError = error.request;
      // La solicitud fue hecha pero no se recibió respuesta
      console.error(
        "No se recibió respuesta del servidor:",
        messageError,
        Date(),
        2
      );
    } else {
      messageError = error.message;
      // Error desconocido
      console.error("Error desconocido:", messageError, Date(), 3);
    }
    // io.to(socketTienda[0].id).emit("callBack", {endPoint, id, message: `${method} ERROR`, estatus: 0, opc: 2, });
    objCallback.message = `${method} ERROR ${messageError}`;
    objCallback.estatus = 0;
    return objCallback;
  }
};
module.exports = {
  getInfo,
  getIdTienda,
  mappingErrors,
  socketInsertData,
  socketUpdateData,
  processesCentralData,
};
