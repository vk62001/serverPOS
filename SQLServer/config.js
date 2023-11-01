const config = {
  user: process.env.user_mssql, // better stored in an app setting such as process.env.DB_USER
  password: process.env.password_mssql, // better stored in an app setting such as process.env.DB_PASSWORD
  server: process.env.host_mssql, // better stored in an app setting such as process.env.DB_SERVER
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: process.env.database_mssql, // better stored in an app setting such as process.env.DB_NAME
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};

module.exports = config;
