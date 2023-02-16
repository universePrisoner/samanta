const path = require('path');

module.exports = {
	roots: ['<rootDir>/'],
	transform: {
		'^.+\\.tsx?$': 'babel-jest',
	},

	moduleFileExtensions: ['ts', 'tsx', 'js'],
	moduleDirectories: ['node_modules'],

	moduleNameMapper: {
		'^spec(.*)$': '<rootDir>/src/spec/$1',
	},

	setupFiles: ['<rootDir>/config/tests/jest/client.ts'],
};
