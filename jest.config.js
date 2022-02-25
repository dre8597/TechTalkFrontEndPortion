module.exports = {
	globals: {
		'ts-jest': {
			tsconfig: './tsconfig.json',
		},
	},
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
	roots: ['src'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testMatch: ['**/*.test.{ts,tsx}'],
	testEnvironment: 'jsdom',
	preset: 'ts-jest',
	setupFilesAfterEnv: ['./src/tests/setupTests.ts'],
	collectCoverageFrom: [
		'./src/**/*.tsx',
		'!./src/App.tsx',
		'!./src/index.tsx',
		'!./src/tests/**',
		'!./src/migrations/**',
		'!./src/entities/*.ts',
	],
	coverageDirectory: './coverage',
	coverageThreshold: {
		global: {
			statements: 100,
			branches: 100,
			functions: 100,
			lines: 100,
		},
	},
};
