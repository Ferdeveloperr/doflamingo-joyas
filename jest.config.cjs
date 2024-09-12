module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./setupTest.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  testMatch: ['**/*.test.js', '**/*.test.jsx'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
