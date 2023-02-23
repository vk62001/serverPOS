"use strict";

const sql = require('mssql');
const config = require('./config');
const axios = require('axios');

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

module.exports = {
    getTable,
}