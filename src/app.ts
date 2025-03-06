// Importiere benötigte Module und Abhängigkeiten
import express, { Express, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import { connection } from './db'; // Ohne .ts, falls tsconfig.json richtig konfiguriert ist




// Importiere die Routenmodule
import { infoRoutes } from "./routes/infoRoutes";
import { blackHoleRoutes } from "./routes/blackHoleRoutes";
import { userRoutes } from "./routes/userRoutes";
import { swaggerSpec } from "./config/swagger"; // Importiere die Swagger-Spezifikation

// Lade Umgebungsvariablen aus der .env-Datei
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000; // Nutze den konfigurierten Port oder Standardport 3000

// Middleware für JSON-Parsing
app.use(express.json());

// CORS-Middleware, um Anfragen von anderen Domains zu erlauben
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Erlaubt Anfragen von allen Domains
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Integriere Swagger UI zur API-Dokumentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Registriere die API-Routen
app.use("/api/v1/info", infoRoutes);
app.use("/api/v1/blackholes", blackHoleRoutes);
app.use("/api/v1/users", userRoutes);

// Fehlerbehandlungsmiddleware für unerwartete Fehler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Logge den Fehler in der Konsole
  res.status(500).json({ error: "Something went wrong!" }); // Sende eine generische Fehlermeldung an den Client
});


/// Start Datenbank Code

// Middleware, um den Body der Anfrage zu parsen
app.use(express.json());

// Route zum Registrieren eines neuen Nutzers
app.post('/register', async (req: Request, res: Response): Promise<Response> => {
  const { first_name, last_name, email, password }: { first_name: string, last_name: string, email: string, password: string } = req.body;

  // Ausgabe der empfangenen Daten
  console.log(req.body);

  // Überprüfe, ob alle erforderlichen Felder vorhanden sind
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).send('Bitte alle Felder ausfüllen');
  }

  try {
    // Überprüfe, ob der Benutzer bereits existiert
    const [results]: any = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length > 0) {
      return res.status(400).send('E-Mail wird bereits verwendet');
    }

    // Passwort verschlüsseln
    const hashedPassword = await bcrypt.hash(password, 10);

    // Füge den neuen Benutzer in die Datenbank ein
    const query = 'INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)';
    await connection.promise().query(query, [first_name, last_name, email, hashedPassword]);

    return res.status(200).send('Benutzer erfolgreich registriert');
  } catch (err) {
    console.error('Fehler:', err);
    return res.status(500).send('Interner Serverfehler');
  }
});


// Starte den Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});

export { app };
