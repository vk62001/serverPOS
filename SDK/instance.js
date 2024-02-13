const axios = require("axios");

const URI = process.env.URi_central;

console.log(URI, "Uri CENTRAL", Date());

const APISQ = axios.create({
  baseURL: URI,
  timeout: 90000,
  headers: {
    Authorization: `Basic ${process.env.credentials}`,
    "Content-Type": "application/json",
  },
});

module.exports = APISQ;
