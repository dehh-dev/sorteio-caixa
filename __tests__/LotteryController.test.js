import { LotteryController } from "../controllers/LotteryController.js";
import { LotteryResult } from "../models/LotteryResult.js";
import { CacheManager } from "../models/CacheManager.js";

describe("LotteryController Integration", () => {
  const testCacheFile = process.cwd() + "/data/test-integration-cache.json";
  let originalCacheFile;

  beforeEach(() => {
    const fs = require("fs");
    originalCacheFile = process.cwd() + "/data/resultados.json";
    process.env.CACHE_FILE = testCacheFile;
    if (fs.existsSync(testCacheFile)) {
      fs.unlinkSync(testCacheFile);
    }
  });

  describe("formatarData", () => {
    it("formats date in pt-BR format", () => {
      const testDate = new Date(2026, 3, 20, 14, 30, 45);
      const formatted = LotteryController.formatarData(testDate);

      expect(formatted).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
    });

    it("pads single digit values with zero", () => {
      const testDate = new Date(2026, 0, 5, 3, 5, 2);
      const formatted = LotteryController.formatarData(testDate);

      expect(formatted).toBe("05/01/2026 03:05:02");
    });
  });

  describe("fetchAllResults", () => {
    it("fetches both lotofacil and lotomania results", async () => {
      const results = await LotteryController.fetchAllResults();

      expect(results).toHaveProperty("lotofacil");
      expect(results).toHaveProperty("lotomania");
    });

    it("returns LotteryResult instances or null", async () => {
      const results = await LotteryController.fetchAllResults();

      if (results.lotofacil) {
        expect(results.lotofacil).toBeInstanceOf(LotteryResult);
      }
      if (results.lotomania) {
        expect(results.lotomania).toBeInstanceOf(LotteryResult);
      }
    });
  });

  describe("getCache and saveCache", () => {
    beforeEach(() => {
      const fs = require("fs");
      if (fs.existsSync(testCacheFile)) {
        fs.unlinkSync(testCacheFile);
      }
    });

    afterEach(() => {
      const fs = require("fs");
      if (fs.existsSync(testCacheFile)) {
        fs.unlinkSync(testCacheFile);
      }
    });

    it("returns null when cache is empty", () => {
      const fs = require("fs");
      const testManager = new CacheManager(testCacheFile);
      if (fs.existsSync(testCacheFile)) {
        fs.unlinkSync(testCacheFile);
      }
      const cache = testManager.read();
      expect(cache).toBeNull();
    });

    it("saves and retrieves cache data", () => {
      const lotofacil = new LotteryResult("20/04/2026", 100, [1, 2, 3]);
      const lotomania = new LotteryResult("20/04/2026", 200, [4, 5, 6]);

      const testManager = new CacheManager(testCacheFile);
      testManager.write({
        lotofacil: lotofacil.toJSON(),
        lotomania: lotomania.toJSON(),
      });

      const cache = testManager.read();
      expect(cache).not.toBeNull();
      expect(cache.lotofacil.concurso).toBe(100);
      expect(cache.lotomania.concurso).toBe(200);
    });
  });
});
