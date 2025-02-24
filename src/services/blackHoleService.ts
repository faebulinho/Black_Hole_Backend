
import { Request, Response } from "express";

import puppeteer from "puppeteer";

export interface BlackHoleInfo {
  name: string;
  mass: string;
  source: string;
  error?: string;
}

export class BlackHoleService {
  private readonly baseUrl = "https://www.astro.gsu.edu/AGNmass/";

  public async getBlackHoleInfo(name: string): Promise<BlackHoleInfo> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(this.baseUrl, { waitUntil: "domcontentloaded" });

      // XPath-Muster für alle Namen in der Tabelle
      const nameXPathPattern = `/html/body/font/center/form[2]/font/font/center/table/tbody/tr/td[2]/a`;

      // Alle Namen der Schwarzen Löcher mit ihrer Zeilennummer extrahieren
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
            results[blackHoleName] = i + 1; // tr[X] beginnt bei 1
          }
        }
        return results;
      }, nameXPathPattern);

      // Prüfen, ob der Name existiert
      if (!(name in blackHoleRows)) {
        await browser.close();
        return {
          name,
          mass: "Nicht gefunden",
          source: this.baseUrl,
          error: `Schwarzes Loch '${name}' nicht gefunden.`,
        };
      }

      // Die Zeilennummer des gefundenen Namens holen
      const rowIndex = blackHoleRows[name];

      // XPath für die Masse generieren (Spalte 3)
      const massXPath = `/html/body/font/center/form[2]/font/font/center/table/tbody/tr[${rowIndex}]/td[3]`;

      // Masse auslesen
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

      await browser.close();

      return {
        name,
        mass,
        source: this.baseUrl,
      };
    } catch (error) {
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

export const blackHoleService = new BlackHoleService();
