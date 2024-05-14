module.exports = {
  roots: ['<rootDir>'],
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node', 'tsx'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
};