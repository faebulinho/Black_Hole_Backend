const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const connection = require('./db');  // Importiere die MySQL-Verbindung
require('dotenv').config();  // Lädt die Umgebungsvariablen aus der .env-Datei

const app = express();
const port = 3000;

// Middleware, um den Body der Anfrage zu parsen
app.use(bodyParser.json());

// Route zum Registrieren eines neuen Nutzers
app.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  console.log(req.body);  // Ausgabe der empfangenen Daten

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).send('Bitte alle Felder ausfüllen');
  }

  // Überprüfe, ob der Benutzer bereits existiert
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Datenbankfehler:', err);
      return res.status(500).send('Interner Serverfehler');
    }

    if (results.length > 0) {
      return res.status(400).send('E-Mail wird bereits verwendet');
    }

    // Passwort verschlüsseln
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Fehler beim Hashen des Passworts:', err);
        return res.status(500).send('Interner Serverfehler');
      }

      // Füge den neuen Benutzer in die Datenbank ein
      const query = 'INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)';
      connection.query(query, [first_name, last_name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Fehler beim Einfügen des Nutzers:', err);
          return res.status(500).send('Interner Serverfehler');
        }

        return res.status(200).send('Benutzer erfolgreich registriert');
      });
    });
  });
});

// Starte den Server und gebe einen Fehler aus, wenn er nicht startet
app.listen(port, (err) => {
  if (err) {
    console.error('Fehler beim Starten des Servers:', err);
    return;
  }
  console.log(`Server läuft auf http://localhost:${port}`);
});