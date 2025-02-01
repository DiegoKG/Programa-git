const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ALLhope2024",
  database: "rewear",
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión: " + err.stack);
    return;
  }
  console.log("Conectado a MySQL con ID " + connection.threadId);
});

module.exports = connection;
