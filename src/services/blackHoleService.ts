import axios from "axios";
import cheerio from "cheerio";

export interface BlackHoleInfo {
  name: string;
  mass: string;
  source: string;
  error?: string;
}

export class BlackHoleService {
  private readonly baseUrl = "https://en.wikipedia.org/wiki/";

  public async getBlackHoleInfo(name: string): Promise<BlackHoleInfo> {
    try {
      // Format the name for URL (replace spaces with underscores)
      const formattedName = name.replace(/ /g, "_");
      const url = `${this.baseUrl}${formattedName}`;

      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Try to find mass information in the infobox
      let mass = $(".infobox")
        .find('th:contains("Mass")')
        .next("td")
        .text()
        .trim();

      // If no mass found in infobox, try searching in paragraphs
      if (!mass) {
        const massRegex =
          /mass.*?(?:of|is|approximately|about|~)?.*?(?:\d+(?:\.\d+)?(?:\s*[×x]\s*10\^?\d+)?|\d+(?:\.\d+)?)[^\d]*(?:M☉|solar mass(?:es)?)/i;
        $("p").each((_, elem) => {
          const text = $(elem).text();
          const match = text.match(massRegex);
          if (match) {
            mass = match[0];
            return false; // Break the loop
          }
        });
      }

      return {
        name,
        mass: mass || "Mass information not found",
        source: url,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          name,
          mass: "Not found",
          source: "",
          error: "Black hole information not found",
        };
      }
      throw error;
    }
  }
}

export const blackHoleService = new BlackHoleService();
