import puppeteer from "puppeteer";
import { Request, Response } from "express";

export interface BlackHoleInfo {
  name: string;
  mass: string;
  source: string;
  error?: string;
}

export class BlackHoleService {
  private readonly baseUrl = "https://www.astro.gsu.edu/AGNmass/";

  public async fetchBlackHoleInfo(): Promise<BlackHoleInfo> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = this.baseUrl;

    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });

      // Schwarzen Loch Namen extrahieren
      const name = await page.evaluate(() => {
        const nameElement = document.querySelector("h1"); // Beispiel: Titel des Schwarzen Lochs
        return nameElement ? nameElement.textContent?.trim() || "Name nicht gefunden" : "Name nicht gefunden";
      });

      // Masse des Schwarzen Lochs extrahieren (muss an die Webseitenstruktur angepasst werden)
      const mass = await page.evaluate(() => {
        const massElement = document.querySelector("table tr:nth-child(2) td:nth-child(2)"); // Beispiel: Tabellenstruktur
        return massElement ? massElement.textContent?.trim() || "Masse nicht gefunden" : "Masse nicht gefunden";
      });

      await browser.close();

      return {
        name,
        mass,
        source: url,
      };
    } catch (error) {
      await browser.close();
      return {
        name: "Unbekannt",
        mass: "Nicht gefunden",
        source: url,
        error: "Fehler beim Scraping der Daten",
      };
    }
  }
}

export const blackHoleService = new BlackHoleService();
