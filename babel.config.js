
module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript' // Añadir preset de TypeScript
    ],
    plugins: [
        '@babel/plugin-transform-runtime' // Habilita el plugin
    ],
};