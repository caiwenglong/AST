const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: "xuni",
        filename: 'main.js',
    },
    devServer: {
        port: 8081,
        contentBase: 'www'
    }
};