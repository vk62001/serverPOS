const APISQLocal = require('./instanceLocal');

const SDKLocal = {
    getInfo : function (id) {
        return APISQLocal.get(`api/v1/AperturasTiendas/${id}`);
    },
    getInfoTienda: function(){
        return APISQLocal.get('api/v1/Configuraciones')
    },
    getTablas: function(){
        return APISQLocal.get('api/v1/CountRegistros')
    }
}

module.exports = {
    SDKLocal
}