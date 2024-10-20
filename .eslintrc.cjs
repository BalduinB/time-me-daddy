/** @type {import("eslint").Linter.Config} */
const config = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: true,
    },
    plugins: ["boundaries", "@typescript-eslint", "drizzle"],
    extends: [
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
    ],
    settings: {
        "boundaries/include": ["src/**/*"],
        "boundaries/elements": [
            {
                mode: "full",
                type: "shared",
                pattern: [
                    "src/components/**/*",
                    "src/data/**/*",
                    "src/drizzle/**/*",
                    "src/hooks/**/*",
                    "src/lib/**/*",
                    "src/server/**/*",
                    "src/trpc/**/*",
                    "src/env.js",
                ],
            },
            {
                mode: "full",
                type: "feature",
                capture: ["featureName"],
                pattern: ["src/features/*/**/*"],
            },
            {
                mode: "full",
                type: "app",
                capture: ["_", "fileName"],
                pattern: ["src/app/**/*"],
            },
            {
                mode: "full",
                type: "neverImport",
                pattern: ["src/*", "src/tasks/**/*"],
            },
        ],
    },
    rules: {
        "boundaries/no-unknown": ["error"],
        "boundaries/no-unknown-files": ["error"],
        "boundaries/element-types": [
            "error",
            {
                default: "disallow",
                rules: [
                    {
                        from: ["shared"],
                        allow: ["shared"],
                    },
                    {
                        from: ["shared"],
                        allow: ["feature"],
                    },
                    {
                        from: ["feature"],
                        allow: [
                            "shared",
                            ["feature", { featureName: "${from.featureName}" }],
                        ],
                    },
                    {
                        from: ["app", "neverImport"],
                        allow: ["shared", "feature"],
                    },
                    {
                        from: ["app"],
                        allow: [["app", { fileName: "*.css" }]],
                    },
                ],
            },
        ],
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/consistent-type-imports": [
            "warn",
            {
                prefer: "type-imports",
                fixStyle: "inline-type-imports",
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                argsIgnorePattern: "^_",
            },
        ],
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                checksVoidReturn: {
                    attributes: false,
                },
            },
        ],
        "drizzle/enforce-delete-with-where": [
            "error",
            { drizzleObjectName: ["db", "ctx.db"] },
        ],
        "drizzle/enforce-update-with-where": [
            "error",
            { drizzleObjectName: ["db", "ctx.db"] },
        ],
    },
};
module.exports = config;
