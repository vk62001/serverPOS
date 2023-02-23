const axios = require('axios');

const URI = process.env.URi_central;

console.log(URI);

const APISQ =  axios.create({
    baseURL:URI,
    timeout: 1000,
    headers :{
        'Authorization': `Basic ${process.env.credentials}`, 
        'Content-Type': 'application/json'
    }
});


module.exports =  APISQ;