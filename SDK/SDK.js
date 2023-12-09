const APISQ = require("./instance");

const SDK = {
  insertData: function (endPoint, data) {
    return APISQ.post(`api/v1/${endPoint}/`, data);
  },
  updateData: function (endPoint, id, data) {
    const url =
      endPoint === "ExistenciasTiendas"
        ? `api/v1/${endPoint}/${id}/${data.tienda_Id}/${data.producto_Id}/${data.almacen_Id}`
        : `api/v1/${endPoint}/${id}`;
    console.log(url);
    return APISQ.put(url, data);
  },
};

module.exports = {
  SDK,
};
