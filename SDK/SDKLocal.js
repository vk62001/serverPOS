const APISQLocal = require("./instanceLocal");

const SDKLocal = {
  getInfoFilter: function (proceso, id, filter) {
    const url = `api/v1/${proceso}/${id}/${filter}`;
    return APISQLocal.get(url);
  },
  getInfo: function (proceso, id) {
    const url = id === "" ? `api/v1/${proceso}` : `api/v1/${proceso}/${id}`;
    return APISQLocal.get(url);
  },
  getInfoTienda: function () {
    return APISQLocal.get("api/v1/Configuraciones");
  },
  getTablas: function () {
    return APISQLocal.get("api/v1/CountRegistros");
  },
  insertData: function (endPoint, data) {
    const url = `api/v1/${endPoint}/`;
    console.log("post", url, Date());
    return APISQLocal.post(url, data);
  },
  updateData: function (endPoint, id, data) {
    const url =
      endPoint === "ExistenciasTiendas"
        ? `api/v1/${endPoint}/${id}/${data.tienda_Id}/${data.producto_Id}/${data.almacen_Id}`
        : `api/v1/${endPoint}/${id}`;
    console.log("update", url, Date());
    return APISQLocal.put(url, data);
  },
};

module.exports = {
  SDKLocal,
};
