const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'none',
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
            // регулярное выражение, которое ищет все js файлы
            test: /\.js$/,
            // при обработке этих файлов нужно использовать babel-loader
            loader: 'babel-loader',
            // исключает папку node_modules, файлы в ней обрабатывать не нужно
            exclude: '/node_modules/'
            },
            {
            // регулярное выражение, которое ищет все файлы с такими расширениями
            test: /\.(png|svg|jpg|gif|woff|woff2)$/,
            // при обработке этих файлов нужно использовать file-loader
            loader: 'file-loader'
            },
            // аналогично добавьте правило для работы с html
            {
            test: /\.html$/,
            loader: 'html-loader',
            },
            {
            test: /\.css$/,
            loader: [
                MiniCssExtractPlugin.loader,
                {
                loader: 'css-loader',
                options: { importLoaders: 1 }
                },
                'postcss-loader'
              ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new MiniCssExtractPlugin()
    ]
};