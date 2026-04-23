import { CacheManager } from "../models/CacheManager.js";
import fs from "fs";
import path from "path";

describe("CacheManager", () => {
  let cacheManager;
  const testCachePath = path.join(process.cwd(), "data", "test-cache.json");

  beforeEach(() => {
    cacheManager = new CacheManager(testCachePath);
    if (fs.existsSync(testCachePath)) {
      fs.unlinkSync(testCachePath);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testCachePath)) {
      fs.unlinkSync(testCachePath);
    }
  });

  describe("read", () => {
    it("returns null when cache file does not exist", () => {
      const result = cacheManager.read();
      expect(result).toBeNull();
    });

    it("reads cache data from file", () => {
      const testData = {
        lotofacil: { data: "20/04/2026", concurso: 100, numeros: [1, 2, 3] },
        lotomania: { data: "20/04/2026", concurso: 200, numeros: [4, 5, 6] },
      };

      cacheManager.write(testData);
      const result = cacheManager.read();

      expect(result).toEqual(testData);
    });
  });

  describe("write", () => {
    it("creates directory if it does not exist", () => {
      const nestedPath = path.join(
        process.cwd(),
        "data",
        "nested",
        "test.json"
      );
      const nestedManager = new CacheManager(nestedPath);

      nestedManager.write({ test: "data" });

      expect(fs.existsSync(nestedPath)).toBe(true);

      fs.unlinkSync(nestedPath);
      fs.rmdirSync(path.dirname(nestedPath));
    });

    it("writes data to JSON file", () => {
      const testData = { foo: "bar" };
      cacheManager.write(testData);

      expect(fs.existsSync(testCachePath)).toBe(true);
      const content = JSON.parse(fs.readFileSync(testCachePath, "utf-8"));
      expect(content).toEqual(testData);
    });
  });
});
