const APISQLocal = require("./instanceLocal");

const SDKLocal = {
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
};

module.exports = {
  SDKLocal,
};
