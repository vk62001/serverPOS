const APISQLocal = require("./instanceLocal");

const SDKLocal = {
  getInfo: function (proceso, id) {
    return APISQLocal.get(`api/v1/${proceso}/${id}`);
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
