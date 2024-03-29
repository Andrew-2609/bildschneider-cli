const defaultConfig = {
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageReporters: [
        "text",
        "lcov",
    ],
    coverageThreshold: {
        global: {
            branch: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        }
    },
    maxWorkers: "50%",
    watchPathIgnorePatterns: [
        "node_modules"
    ],
    transformIgnorePatterns: [
        "node_modules"
    ]
}

export default {
    projects: [{
        ...defaultConfig,
        testEnvironment: "node",
        displayName: "backend",
        collectCoverageFrom: [
            "src/"
        ],
        testMatch: [
            "**/tests/**/src/**/*.test.js"
        ],
        moduleNameMapper: {
            "chalk": "chalk/source/index.js",
            "#ansi-styles": "chalk/source/vendor/ansi-styles/index.js",
            "#supports-color": "chalk/source/vendor/supports-color/index.js"
        },
    }]
};