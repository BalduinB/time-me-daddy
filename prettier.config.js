/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    tabWidth: 4,
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrder: [
        "^(next/(.*)$)|^(next$)|^react/(.*)|^(react$)",
        "<THIRD_PARTY_MODULES>",
        "^(react/(.*)$)|^(react$)",
        "^@/(.*)$",
        "^[./]",
    ],
    plugins: [
        "@trivago/prettier-plugin-sort-imports",
        "prettier-plugin-tailwindcss",
    ],
};

export default config;
