/* eslint-disable no-undef */
module.exports = {
  collectCoverage: true,
  rootDir: '../src',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts'],
  coverageDirectory: '<rootDir>/../target/coverage',
  setupFiles: ['../config/setupTests'],
  setupFilesAfterEnv: ['../config/testImports.js'],
  testMatch: ['<rootDir>/**/*.spec.js'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.(c|le|sc)ss$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
};
