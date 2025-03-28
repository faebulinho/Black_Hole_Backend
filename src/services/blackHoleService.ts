//Klasse für Funktion von Enpoint (Data Scraping wird hier gemacht)

// Importiere Puppeteer für zum Scrapen
import puppeteer from "puppeteer";

// Definiere eine Schnittstelle für die zurückgegebenen Schwarzes-Loch-Informationen
export interface BlackHoleInfo {
  name: string;
  mass: string;
  source: string;
  error?: string;
}

// Klasse für das Data-Scraping von Daten von den Schwarzen Löchern
export class BlackHoleService {
  // URL der Webseite angeben, wo man scraped
  private readonly baseUrl = "https://www.astro.gsu.edu/AGNmass/";

  // Methode für das Data-Scraping/ holen der benötigten Infos
  public async getBlackHoleInfo(name: string): Promise<BlackHoleInfo> {
    // Starte einen neuen Puppeteer-Browser im Headless-Modus
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      // Öffnet die Webseite 
      await page.goto(this.baseUrl, { waitUntil: "domcontentloaded" });

      // XPath-Muster zum Extrahieren aller Namen in der Tabelle (Wurde auf die Tabelle der Webseite angepasst)
      const nameXPathPattern = `/html/body/font/center/form[2]/font/font/center/table/tbody/tr/td[2]/a`;

      // Extrahiere alle Namen der Schwarzen Löcher und speichere sie mit ihrer Zeilennummer
      const blackHoleRows = await page.evaluate((xpath) => {
        const nodesSnapshot = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        );

        let results: Record<string, number> = {};
        for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
          const node = nodesSnapshot.snapshotItem(i);
          if (node) {
            const blackHoleName = node.textContent?.trim() || "Unbekannt";
            results[blackHoleName] = i + 1; // Tabellenreihen beginnen bei 1
          }
        }
        return results;
      }, nameXPathPattern);

      // Überprüfen, ob der gesuchte Name in der Tabelle existiert
      if (!(name in blackHoleRows)) {
        await browser.close();
        return {
          name,
          mass: "Nicht gefunden",
          source: this.baseUrl,
          error: `Schwarzes Loch '${name}' nicht gefunden.`,
        };
      }

      // Bestimme die Zeilennummer des gesuchten Schwarzen Lochs
      const rowIndex = blackHoleRows[name];

      // Generiere den XPath für die Masse (Spalte 3 der gefundenen Zeile)
      const massXPath = `/html/body/font/center/form[2]/font/font/center/table/tbody/tr[${rowIndex}]/td[3]`;

      // Masse des gesuchten Schwarzen Lochs herausnehmen
      const mass = await page.evaluate((xpath) => {
        const result = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        return result ? result.textContent?.trim() || "Masse nicht gefunden" : "Masse nicht gefunden";
      }, massXPath);

      // Schließe den Browser nach Abschluss des Scraping-Vorgangs
      await browser.close();

      return {
        name,
        mass,
        source: this.baseUrl,
      };
    } catch (error) {
      // Falls ein Fehler auftritt, Browser schließen und Fehler zurückgeben
      await browser.close();
      return {
        name,
        mass: "Nicht gefunden",
        source: this.baseUrl,
        error: "Fehler beim Scraping der Daten",
      };
    }
  }
}

// Erstelle eine Instanz des Services zur Wiederverwendung
export const blackHoleService = new BlackHoleService();
