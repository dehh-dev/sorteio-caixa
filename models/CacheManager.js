import fs from "fs";
import path from "path";

export class CacheManager {
  constructor(cacheFilePath) {
    this.cacheFilePath = cacheFilePath;
  }

  ensureDirectory() {
    const dir = path.dirname(this.cacheFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  read() {
    try {
      if (fs.existsSync(this.cacheFilePath)) {
        const conteudo = fs.readFileSync(this.cacheFilePath, "utf-8");
        return JSON.parse(conteudo);
      }
    } catch (err) {
      console.error("[CACHE] Erro ao ler cache:", err.message);
    }
    return null;
  }

  write(data) {
    try {
      this.ensureDirectory();
      fs.writeFileSync(
        this.cacheFilePath,
        JSON.stringify(data, null, 2),
        "utf-8"
      );
      console.log("[CACHE] Resultados salvos com sucesso");
    } catch (err) {
      console.error("[CACHE] Erro ao salvar cache:", err.message);
    }
  }
}
