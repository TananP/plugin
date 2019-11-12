var webpack = require('webpack');
var path = require("path");

module.exports = {
    context: __dirname,
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "navigation-ui-bundle.js",
        publicPath: "/",
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                use: [
                    "polymer-webpack-loader"
                ]
            },
            {
                test: /\.ts$/,
                use: [
                    'ts-loader?{"transpileOnly":true, "configFile":"tsconfig.json"}'
                ]
            }
        ]
    },
    externals: [
        function(context, request, callback) {
            if (/^(.+\/+three|three$)/i.test(request)) {
                return callback(null, "THREE");
            }
            callback();
        }
    ],
};