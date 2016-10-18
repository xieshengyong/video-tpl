var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: '.',
        filename: "./dist/js/main.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /js[\/|\\]lib[\/||\\][\w|\.|_|-]+js$/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=/dist/js/lib/[name].[ext]'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.(jpg|png)$/,
                loader: "file-loader?limit=5120&name=/dist/img/[name].[ext]"
            }
        ]
    },
    resolve: {
        alias: {
            'zepto': './lib/zepto.min.js'
        }
    },
    externals: {
        '$':'window.$',
        'global' : 'window.global'
    },
    plugins: [
        new ExtractTextPlugin("/dist/css/style.css")
    ]
};
