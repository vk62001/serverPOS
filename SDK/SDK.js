const APISQ = require('./instance');

const SDK = {
    apertura : function(data) {
        return APISQ.post('api/v1/AperturasTiendas/', data)
    },
    updateApertura : function (id, data) {
        return APISQ.put(`api/v1/AperturasTiendas/${id}`, data)
    },
    
}

module.exports = {
    SDK
}