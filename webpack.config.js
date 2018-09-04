var path = require('path');

module.exports = {
    mode: "development",
    entry: "./Components/index.jsx",
    output: {
        path: path.resolve(__dirname + "/Client"),
        filename: "bundle.js"
        // library: "MyLibrary"
    },
    module: {
        rules: [
            {
                test: /\jsx$/,
                // include: [
                //     path.resolve(__dirname, "Components")
                // ],
                exclude: /node_modules/,
                loader: "babel-loader",
                // options: {
                //     presets: ["es2015"]
                // }
                query: {
                    presets: ['env', 'react']
                }
            }
        ]
    }
    // resolve: {
    //     modules: [
    //         "node_modules",
    //         path.resolve(__dirname, "Components")
    //     ],
    //     extensions: ['.js', '.jsx']
    // }
};