"use strict";

const sql = require('mssql');
const config = require('./config');


const getTable =  async (table) => {
    const  poolConnection = await sql.connect(config);
    try {
        var resultSet = await poolConnection.request().query(`SELECT * FROM sqt_tienda`);
        poolConnection.close();
        return resultSet;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getTable
}