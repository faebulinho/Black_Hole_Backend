// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Dein MySQL-Benutzername
  password: '', // Dein MySQL-Passwort
  database: 'blackhole_simulation_userdata', // Dein Datenbankname
});

connection.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur Datenbank:', err);
    return;
  }
  console.log('Mit der MySQL-Datenbank verbunden!');
});

module.exports = connection;