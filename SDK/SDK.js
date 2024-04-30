const APISQ = require("./instance");

const SDK = {
  insertData: function (endPoint, data) {
    const url = `api/v1/${endPoint}/`;
    console.log("post", url, Date());
    return APISQ.post(url, data);
  },
  updateData: function (endPoint, id, data) {
    const url =
      endPoint === "ExistenciasTiendas"
        ? `api/v1/${endPoint}/${id}/${data.tienda_Id}/${data.producto_Id}/${data.almacen_Id}`
        : `api/v1/${endPoint}/${id}`;
    console.log("update", url, Date());
    return APISQ.put(url, data);
  },
};

module.exports = {
  SDK,
};
