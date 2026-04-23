import { LotteryResult } from "../models/LotteryResult.js";
import { CacheManager } from "../models/CacheManager.js";

const CACHE_FILE = process.cwd() + "/data/resultados.json";
const cacheManager = new CacheManager(CACHE_FILE);

export class LotteryController {
  static async fetchFromApi(jogo) {
    try {
      const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${jogo}`;
      const res = await fetch(url, {
        headers: {
          Referer: "https://loterias.caixa.gov.br/",
          "User-Agent": "Mozilla/5.0",
        },
      });

      if (!res.ok) {
        console.error(`[API] ${jogo} retornou status ${res.status}`);
        return null;
      }

      const json = await res.json();
      return LotteryResult.fromApi(json);
    } catch (err) {
      console.error(`[API] Erro ao buscar ${jogo}:`, err.message);
      return null;
    }
  }

  static async fetchAllResults() {
    const [lotofacil, lotomania] = await Promise.all([
      this.fetchFromApi("lotofacil"),
      this.fetchFromApi("lotomania"),
    ]);
    return { lotofacil, lotomania };
  }

  static getCache() {
    return cacheManager.read();
  }

  static saveCache(lotofacil, lotomania) {
    cacheManager.write({
      lotofacil: lotofacil.toJSON(),
      lotomania: lotomania.toJSON(),
    });
  }

  static formatarData(date) {
    const pad = (n) => String(n).padStart(2, "0");
    return (
      `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    );
  }
}
