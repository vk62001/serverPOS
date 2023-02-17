"use strict";

const sql = require('mssql');
const config = require('./config');


const getTable =  async (table) => {
    const  poolConnection = await sql.connect(config);
    try {
        var resultSet = await poolConnection.request().query(`SELECT * FROM sqt_tienda`);
        
        return resultSet;
    } catch (err) {
        console.error(err.message);
    }
    poolConnection.close();
}

const updateApertura = () => {
    //exec sqsp_ComunicacionSQ 2, 'AperturasTiendas', 0
    //revisar no hay conexión
    //return  //salvar el log false
    //si salvar central
        

        try{
            //salvar el log true
        }catch(err){    
            //salvar el log false
        }
}

module.exports = {
    getTable,
    updateApertura
}