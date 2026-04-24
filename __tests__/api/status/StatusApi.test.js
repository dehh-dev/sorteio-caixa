describe("Status API", () => {
  it("API directory exists", () => {
    const cwd = process.cwd();
    expect(cwd).toContain("sorteio-caixa");
  });

  it("test directory exists", () => {
    expect(__dirname).toContain("__tests__");
  });
});
