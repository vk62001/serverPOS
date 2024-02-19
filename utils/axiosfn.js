const { SDK } = require("../SDK/SDK");
const { SDKLocal } = require("../SDK/SDKLocal");
const { saveLog } = require("../SQLServer/SQL");
const { eliminarPropiedadesVacias } = require("./utils");

const crypto = require("crypto");

const axiosInsertData = async (endPoint, obj, id) => {
  try {
    const { data } = await SDK.insertData(endPoint, obj);

    if (endPoint === "Kardex") console.log(data);
    //arregla cuando el sitio es marcado como bloqueado y no hay una respuesta
    if (typeof data.message === "undefined" || data.message === null) {
      saveLog(endPoint, id, "Error insert", 0, 0);
    }
    // console.log(data.message, "21", id);

    saveLog(endPoint, id, data.message, 1, 0);
    //se salva el log
  } catch (error) {
    // console.error(error, "error");
    console.log(error, "axiosInsertData", Date());
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error(
        "Respuesta de error del servidor:",
        error.response.data,
        Date()
      );
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error(
        "No se recibió respuesta del servidor:",
        error.message,
        Date()
      );
    } else {
      // Error desconocido
      console.error("Error desconocido:", error.message, Date());
    }

    //err.code  === 'ECONNREFUSED' no hay conexion con server
    // console.log(error, "39 - axiosInsertData", Date());
    // console.log(err.response.data, "12");

    //se salva el log
    saveLog(endPoint, id, "Error insert", 0, 0);

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
    // console.log(data, "--", obj);
    saveLog(endPoint, id, data.message, 1, 0);
  } catch (error) {
    console.log(error, "axiosUpdateData", Date());
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error(
        "Respuesta de error del servidor:",
        error.response.data,
        Date()
      );
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error(
        "No se recibió respuesta del servidor:",
        error.message,
        Date()
      );
    } else {
      // Error desconocido
      console.error("Error desconocido:", error.message, Date());
    }
    //err.code  === 'ECONNREFUSED' no hay conexion con server
    // console.log(error, "60 -axiosUpdateData", Date());
    //se salva el log
    saveLog(endPoint, id, "Error update", 0, 0);
  }
};

const getInfo = async (proceso, id) => {
  try {
    if (proceso === "Ventas") {
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
    } else {
      const { data } = await SDKLocal.getInfo(proceso, id);
      return data.datas;
    }
  } catch (err) {
    console.log(err, "71 - getInfo", Date());
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
    try {
      const claveregistro =
        element.Proceso_Origen === "CountRegistros"
          ? ""
          : element.Proceso_Origen_Id;
      // console.log("id", claveregistro, 77);

      const responseLocal = await SDKLocal.getInfo(
        element.Proceso_Origen,
        claveregistro
      );
      // console.log(responseLocal.data, 83);
      const dataSend =
        element.Proceso_Origen === "CountRegistros"
          ? responseLocal.data.data
          : eliminarPropiedadesVacias(responseLocal.data.datas[0]);
      // console.log(dataSend, "91 - processElement", Date());
      const responseCentral = await SDK.updateData(
        element.Proceso_Origen,
        element.Proceso_Origen_Id,
        dataSend
      );
      // console.log(responseCentral.data, "try");
      if (responseCentral.data.succeeded) {
        // console.log("entra guarda log");
        await saveLog(
          element.Proceso_Origen,
          element.id,
          "Reproceso correcto",
          1,
          1
        );
        numberSuccess++;
      }
    } catch (error) {
      console.log(error, "mappingErrors", Date());
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error(
          "Respuesta de error del servidor:",
          error.response.data.message,
          Date()
        );
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error(
          "No se recibió respuesta del servidor:",
          error.message,
          Date()
        );
      } else {
        // Error desconocido
        console.error("Error desconocido:", error.message, Date());
      }

      // console.log(err, "error 35", 35);

      //console.log(err, "111 - error processElement", Date());
      // // console.log(err.response.data, "error 35", 35);
      await saveLog("Reprocessing", "0", error.message, 1, 0);
    }
  };

  for (const element of data) {
    await processElement(element); // Espera a que se complete la operación antes de continuar con el siguiente elemento
  }

  return numberArray - numberSuccess;
};

module.exports = {
  getInfo,
  getIdTienda,
  axiosInsertData,
  axiosUpdateData,
  mappingErrors,
};
