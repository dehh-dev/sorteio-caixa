import { LotteryController } from "../controllers/LotteryController.js";
import { LotteryResult } from "../models/LotteryResult.js";
import { CacheManager } from "../models/CacheManager.js";

describe("LotteryResult Model", () => {
  describe("fromApi", () => {
    it("creates a LotteryResult from API response", () => {
      const apiResponse = {
        listaDezenas: ["01", "05", "10", "15", "20"],
        dataApuracao: "20/04/2026",
        numero: 1234,
      };

      const result = LotteryResult.fromApi(apiResponse);

      expect(result.data).toBe("20/04/2026");
      expect(result.concurso).toBe(1234);
      expect(result.numeros).toEqual([1, 5, 10, 15, 20]);
    });

    it("handles empty listaDezenas", () => {
      const apiResponse = {
        listaDezenas: [],
        dataApuracao: "",
        numero: 0,
      };

      const result = LotteryResult.fromApi(apiResponse);

      expect(result.numeros).toEqual([]);
      expect(result.concurso).toBe(0);
    });
  });

  describe("fromCache", () => {
    it("creates a LotteryResult from cache data", () => {
      const cacheData = {
        data: "20/04/2026",
        concurso: 3666,
        numeros: [1, 2, 3, 4, 5],
      };

      const result = LotteryResult.fromCache(cacheData);

      expect(result.data).toBe("20/04/2026");
      expect(result.concurso).toBe(3666);
      expect(result.numeros).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("isValid", () => {
    it("returns true for valid result", () => {
      const result = new LotteryResult("20/04/2026", 1234, [1, 2, 3]);
      expect(result.isValid()).toBe(true);
    });

    it("returns false when concurso is 0", () => {
      const result = new LotteryResult("20/04/2026", 0, [1, 2, 3]);
      expect(result.isValid()).toBe(false);
    });

    it("returns false when numeros is empty", () => {
      const result = new LotteryResult("20/04/2026", 1234, []);
      expect(result.isValid()).toBe(false);
    });
  });

  describe("toJSON", () => {
    it("serializes to plain object", () => {
      const result = new LotteryResult("20/04/2026", 1234, [1, 2, 3]);

      const json = result.toJSON();

      expect(json).toEqual({
        data: "20/04/2026",
        concurso: 1234,
        numeros: [1, 2, 3],
      });
    });
  });
});
