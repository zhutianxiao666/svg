const path = require('path');


const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname,'../src/js/demotest.js'),
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: "demotest.js"
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css/,
                use: ['style-loader','css-loader']
            },
            {test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,use:['url-loader?limit=29192']}
        ]
    },
    mode: "production",
    resolve: {
        extensions: ['.js'],
        alias: {
            "@":path.resolve(__dirname,'../','src')
        }
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        open: true,
        quiet: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        // html
    ]
}