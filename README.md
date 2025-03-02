# Black_Hole_Backend

Eine auf TypeScript basierende REST-API, die Informationen über Schwarze Löcher bereitstellt und zusätzlich eine Benutzerverwaltung umfasst. Die API sammelt Daten aus zuverlässigen Quellen und stellt sie über eine gut dokumentierte Schnittstelle bereit.

## Projektstruktur

```
Black_Hole_Backend/
├── src/
│   ├── config/
│   │   └── swagger.ts           # Swagger-Konfiguration
│   ├── controllers/
│   │   ├── blackHoleController.ts   # Verwaltung der Schwarze-Löcher-Daten
│   │   ├── infoController.ts        # Systeminformationen
│   │   └── userController.ts        # Benutzerverwaltung
│   ├── routes/
│   │   ├── blackHoleRoutes.ts
│   │   ├── infoRoutes.ts
│   │   └── userRoutes.ts
│   ├── services/
│   │   └── blackHoleService.ts      # Daten-Scraping für Schwarze Löcher
│   ├── scripts/
│   │   └── generate-swagger.ts      # Generierung der Swagger-Dokumentation
│   └── app.ts                       # Hauptanwendungsdatei
├── .env                            # Umgebungsvariablen
├── .gitignore                      # Git-Ignore-Datei
├── package.json                    # Projektabhängigkeiten
├── tsconfig.json                   # TypeScript-Konfiguration
└── README.md                       # Diese Datei
```

## Verwendete Technologien

### Kerntechnologien

- **TypeScript**: Statische Typisierung und moderne JavaScript-Funktionen
- **Express.js**: Schnelles und minimalistisches Web-Framework für Node.js
- **Node.js**: JavaScript-Laufzeitumgebung für Serveranwendungen

### Dokumentation & API-Design

- **Swagger/OpenAPI**: API-Dokumentation und Testoberfläche
- **swagger-jsdoc**: Generierung der Swagger-Dokumentation aus JSDoc-Kommentaren
- **swagger-ui-express**: Bereitstellung der Swagger UI zur API-Tests

### Datenverarbeitung

- **axios**: HTTP-Client für Anfragen an externe Quellen
- **cheerio**: Web-Scraping-Bibliothek zur HTML-Analyse

### Entwicklungstools

- **ts-node-dev**: Entwicklungsserver mit automatischem Neustart
- **ESLint**: Code-Linter
- **dotenv**: Verwaltung von Umgebungsvariablen

## Voraussetzungen

- Node.js (Version 14 oder höher)
- npm (Version 6 oder höher)

## Installation

1. Repository klonen:

```bash
git clone https://github.com/yourusername/Black_Hole_Backend.git
cd Black_Hole_Backend
```

2. Abhängigkeiten installieren:

```bash
npm install
```

3. `.env`-Datei im Hauptverzeichnis erstellen:

```env
PORT=8080
NODE_ENV=development
```

## Anwendung starten

### Entwicklungsmodus

```bash
npm run dev
```

Startet den Server mit Hot-Reloading.

### Produktionsmodus

```bash
npm start
```

Dies wird:

1. Die neueste Swagger-Dokumentation generieren
2. TypeScript nach JavaScript kompilieren
3. Den Server starten

## API-Dokumentation

Die API-Dokumentation ist verfügbar unter:

```
http://localhost:8080/api-docs
```

### Verfügbare Endpunkte

#### Informationen über Schwarze Löcher

- `GET /api/v1/blackholes/{name}`: Abrufen von Informationen über ein bestimmtes Schwarzes Loch
  - Beispiel: `GET /api/v1/blackholes/Sagittarius%20A*`

#### Systeminformationen

- `GET /api/v1/info/datetime`: Aktuelles Serverdatum und -zeit abrufen
- `GET /api/v1/info/version`: API-Versionsinformationen abrufen

#### Benutzerverwaltung

- `GET /api/v1/users/name`: Benutzernamen abrufen

## Entwicklung

### Neue Endpunkte hinzufügen

1. Controller in `src/controllers/` erstellen
2. JSDoc-Kommentare für die Swagger-Dokumentation hinzufügen
3. Entsprechende Route in `src/routes/` erstellen
4. Route in `app.ts` registrieren

Beispiel-Controller mit Swagger-Dokumentation:

```typescript
/**
 * @swagger
 * /api/v1/your-endpoint:
 *   get:
 *     summary: Beschreibung des Endpunkts
 *     responses:
 *       200:
 *         description: Erfolgreiche Antwort
 */
export class YourController {
  // Implementierung
}
```

### Dokumentation generieren

Die Dokumentation wird automatisch beim Start des Servers generiert, kann aber auch manuell erstellt werden:

```bash
npm run generate-docs
```

## Skripte

- `npm run dev`: Entwicklungsserver starten
- `npm run build`: TypeScript nach JavaScript kompilieren
- `npm start`: Produktionsserver starten
- `npm run generate-docs`: Swagger-Dokumentation generieren
- `npm run lint`: ESLint ausführen

## Fehlerbehandlung

Die API verwendet standardisierte HTTP-Statuscodes:

- 200: Erfolg
- 400: Ungültige Anfrage
- 404: Nicht gefunden
- 500: Serverfehler

Beispiel-Antwort bei einem Fehler:

```json
{
  "error": "Fehlermeldung",
  "details": "Zusätzliche Informationen"
}
```

## Beitragen

1. Feature-Branch erstellen
2. Änderungen vornehmen
3. Swagger-Dokumentation aktualisieren
4. Alle Endpunkte testen
5. Pull-Request einreichen

## Tests

Um Tests auszuführen (falls implementiert):

```bash
npm test
```

## Zukünftige Verbesserungen

- Integration einer Datenbank für Schwarze-Löcher-Daten
- Caching für häufig angefragte Informationen
- Rate-Limiting für API-Anfragen
- Erweiterung der Schwarze-Löcher-Informationen (z. B. Ereignishorizont-Größe, Entfernung zur Erde)
- Benutzer-Authentifizierung und -Autorisierung
- Verbesserte Fehlerbehandlung
- Logging-System zur Fehleranalyse
- Zusätzliche Datenquellen für Schwarze-Löcher-Daten

## Lizenz

MIT License

## Autor

Dein Name

## Danksagungen

- Wikipedia für Schwarze-Löcher-Daten
- Express.js-Community
- TypeScript-Team

