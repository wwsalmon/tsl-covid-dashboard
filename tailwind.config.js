module.exports = {
    mode: 'jit',
    purge: [
        './**/*.html',
        './**/*.tsx',
        './**/*.ts',
    ],
    theme: {
        container: {
            center: true,
            padding: "1rem",
        },
        extend: {
            colors: {
                pomona: "#00549A",
                pitzer: "#F4921C",
                hmc: "#000000",
                scripps: "#33735B",
                cmc: "#98012E",
                tsl: "#3274BE",
            }
        }
    },
    variants: {},
    plugins: [],
}
