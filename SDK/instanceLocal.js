const axios = require('axios');

const URI = process.env.URi_local;

console.log(URI);

const APISQLocal =  axios.create({
    baseURL:URI,
    timeout: 10000,
    // headers :{
    //     'Authorization': `Basic ${process.env.credentials}`, 
    //     'Content-Type': 'application/json'
    // }
});


module.exports =  APISQLocal;