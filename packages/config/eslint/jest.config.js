import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

const baseConfig = {
  preset: 'ts-jest',
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    ...tsJestTransformCfg,
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  testMatch: ['**/?(*.)+(spec|test).?([mc])[jt]s?(x)'],
};

/** @type {import("jest").Config} **/
export default {
  projects: [
    {
      ...baseConfig,
      displayName: 'node',
      testEnvironment: 'node',
    },
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: 'coverage',
};
