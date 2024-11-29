const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'], // Extensiones que Webpack debe resolver
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/, // Archivos que deben ser procesados
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(
            { cleanStaleWebpackAssets: false } // Evita limpiar los archivos que no se han modificado
        ), // Limpia el directorio `dist` antes de cada build
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        hot: true,
        historyApiFallback: true,
        devMiddleware: {
            writeToDisk: true, // Usa caché en memoria
        },
        headers: {
            'Cache-Control': 'no-store', // Desactiva el caché del navegador
        },
    },
    mode: 'development',
    watch: true,
};
