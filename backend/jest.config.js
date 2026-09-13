module.exports = {
  preset: "ts-jest",
  rootDir: ".",
  roots: ["<rootDir>/src"],
  testRegex: ".*\\.spec\\.ts$",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
