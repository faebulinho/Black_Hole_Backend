//Datenbankenfile wird für Milestone I nicht gebraucht
import mysql from 'mysql2';

// Erstelle die MySQL-Verbindung
export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Dein MySQL-Benutzername
  password: '', // Dein MySQL-Passwort
  database: 'blackhole_simulation_userdata', // Dein Datenbankname
});

// Verbindung testen
connection.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur Datenbank:', err);
    return;
  }
  console.log('Mit der MySQL-Datenbank verbunden!');
});

