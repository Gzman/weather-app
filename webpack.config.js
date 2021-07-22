const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },

    plugins: [new HtmlWebpackPlugin({
        filename: "main.html",
        template: "./src/index.html",
    })],

    mode: "development",
}