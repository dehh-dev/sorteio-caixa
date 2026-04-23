export class LotteryResult {
  constructor(data, concurso, numeros) {
    this.data = data;
    this.concurso = concurso;
    this.numeros = numeros;
  }

  static fromApi(json) {
    const numeros = (json.listaDezenas || []).map((n) => parseInt(n, 10));
    return new LotteryResult(json.dataApuracao || "", json.numero || 0, numeros);
  }

  static fromCache(data) {
    return new LotteryResult(data.data, data.concurso, data.numeros);
  }

  isValid() {
    return this.concurso > 0 && this.numeros.length > 0;
  }

  toJSON() {
    return {
      data: this.data,
      concurso: this.concurso,
      numeros: this.numeros,
    };
  }
}
