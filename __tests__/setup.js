import "@testing-library/jest-dom";

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  readFileSync: jest.requireActual("fs").readFileSync,
  writeFileSync: jest.requireActual("fs").writeFileSync,
  existsSync: jest.requireActual("fs").existsSync,
  mkdirSync: jest.requireActual("fs").mkdirSync,
}));
