module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    setupTestFrameworkScriptFile: '<rootDir>/src/setupTests.ts',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        // "config/firebase": "<rootDir>/__mocks__/firebaseMock.js"
    },
    coverageThreshold: {
         './src/components/': {
             branches: 49,
             statements: 75,
         },
        './src/services/': {
            branches: 90,
            statements: 95,
        },
    },
};
