# Black_Hole_Backend

Eine auf TypeScript basierende REST-API, die Informationen über Schwarze Löcher bereitstellt und zusätzlich eine Benutzerverwaltung umfasst. Die API sammelt Daten aus zuverlässigen Quellen und stellt sie über eine gut dokumentierte Schnittstelle bereit. Dieses Repository stellt das Backend zu dem Frontend https://github.com/faebulinho/Black_Hole_Frontend der Webseite, die Simulationen von Schwarzen Löchern darstellt. Backend wurde auf/für Windows entwickelt.

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

## Tests

Um Tests auszuführen (falls implementiert):

```bash
npm test
```

## Datenbank

Das Projekt verwendet eine SQLite-Datenbank mit Prisma als ORM (Object-Relational Mapping) zur Verwaltung der Daten.

### Warum SQLite?

Für dieses Projekt wurde SQLite gewählt aus folgenden Gründen:

- **Einfache Einrichtung**: Keine separate Datenbankinstallation oder -konfiguration erforderlich
- **Dateibasiert**: Die gesamte Datenbank ist in einer einzigen Datei gespeichert, was die Entwicklung und das Testen vereinfacht
- **Portabilität**: Einfacher Transfer zwischen Entwicklungsumgebungen
- **Geringe Ressourcenanforderungen**: Ideal für kleinere bis mittlere Datenmengen wie in diesem Projekt
- **Keine Client-Server-Architektur nötig**: Perfekt für Entwicklungs- und Testumgebungen

SQLite eignet sich besonders gut für dieses Projekt, da es sich um eine Anwendung mit begrenzter gleichzeitiger Schreiblast handelt und die Datenbankstruktur relativ einfach ist.

### Datenbankmodelle

Das Projekt verwendet die folgenden Datenbankmodelle:

#### User

```prisma
model User {
  id            Int      @id @default(autoincrement())
  first_name    String
  last_name     String
  email         String   @unique
  password_hash String
  created_at    DateTime @default(now())
}
```

#### Particle

```prisma
model Particle {
  id         Int      @id @default(autoincrement())
  name       String?
  a          Float    // Spin-Wert
  m          Float    // Massenwert
  created_at DateTime @default(now())
}
```

### Einrichtung und Verwendung

#### 1. Umgebungsvariable einrichten

Erstellen Sie eine `.env`-Datei im Hauptverzeichnis mit der folgenden Zeile (Siehe auch sonst .env.example File für Beispiel):

```
DATABASE_URL="file:./dev.db"
```

#### 2. Prisma-Migrationen erstellen und anwenden

Bei der ersten Einrichtung oder nach Änderungen am Datenbankschema:

```bash
npm run prisma:migrate
```

Dies erstellt eine neue Migration basierend auf Ihrem aktuellen Schema und wendet sie auf die Datenbank an.

#### 3. Prisma Client generieren

```bash
npm run prisma:generate
```

#### 4. Testdaten mit Seed-Skript laden

Um die Datenbank mit Testdaten zu füllen:

```bash
npm run prisma:seed
```

Das Seed-Skript befindet sich in `prisma/seed.ts` und erstellt Beispieldaten für Benutzer und Partikel.

#### 5. Datenbank zurücksetzen (bei Bedarf)

Um alle Daten zu löschen und die Datenbank neu zu initialisieren:

```bash
npm run prisma:reset
```

#### 6. Prisma Studio verwenden

Um eine grafische Benutzeroberfläche zur Verwaltung der Datenbank zu öffnen:

```bash
npm run prisma:studio
```

Damit wird ein Webinterface auf http://localhost:5555 gestartet, mit dem Sie Datensätze anzeigen, hinzufügen, bearbeiten und löschen können.

### Integration in die API

Die Datenbank wird in den Controllern und Services verwendet, um:

- Benutzerinformationen für die Authentifizierung zu speichern und abzurufen
- Partikeldaten zu speichern, die für Schwarze-Loch-Simulationen verwendet werden
- Leistungsdaten zu verfolgen und zu analysieren

### Prisma-Schema-Erweiterungen

Um das Datenbankschema zu erweitern, bearbeiten Sie die Datei `prisma/schema.prisma` und führen Sie anschließend eine Migration durch:

```bash
npm run prisma:migrate
```

Neue Testdaten können durch Anpassung der Datei `prisma/seed.ts` hinzugefügt werden.
