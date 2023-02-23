const APISQLocal = require('./instanceLocal');

const SDKLocal = {
    getInfo : function (id) {
        return APISQLocal.get(`api/v1/AperturasTiendas/${id}`);
    },
}

module.exports = {
    SDKLocal
}