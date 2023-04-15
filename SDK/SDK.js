const APISQ = require("./instance");

const SDK = {
  insertData: function (endPoint, data) {
    return APISQ.post(`api/v1/${endPoint}/`, data);
  },
  updateData: function (endPoint, id, data) {
    return APISQ.put(`api/v1/${endPoint}/${id}`, data);
  },

  // apertura: function (data) {
  //   return APISQ.post("api/v1/AperturasTiendas/", data);
  // },
  // updateApertura: function (id, data) {
  //   return APISQ.put(`api/v1/AperturasTiendas/${id}`, data);
  // },
  // deposito: function (data) {
  //   return APISQ.post("api/v1/Depositos/", data);
  // },
  // updateDeposito: function (id, data) {
  //   return APISQ.put(`api/v1/Depositos/${id}`, data);
  // },
  // historialCajero: function (data) {
  //   return APISQ.post("api/v1/HistorialesCajeros/", data);
  // },
  // updatehistorialCajero: function (id, data) {
  //   return APISQ.put(`api/v1/HistorialesCajeros/${id}`, data);
  // },
  // retiroCaja: function (data) {
  //   return APISQ.post("api/v1/RetirosCaja/", data);
  // },
  // updateReiroCaja: function (id, data) {
  //   return APISQ.put(`api/v1/RetirosCaja/${id}`, data);
  // },
  // remesas: function (data) {
  //   return APISQ.post("api/v1/Remesas/", data);
  // },
  // updateRemesas: function (id, data) {
  //   return APISQ.put(`api/v1/Remesas/${id}`, data);
  // },
  // ticketRemesas: function (data) {
  //   return APISQ.post("api/v1/TicketsRemesas/", data);
  // },
  // updateTicketRemesas: function (id, data) {
  //   return APISQ.post(`api/v1/TicketsRemesas/${id}`, data);
  // },
};

module.exports = {
  SDK,
};
