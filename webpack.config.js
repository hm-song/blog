var path = require('path');

module.exports = {
    entry: [
        './src/main/js/index.js',
    ],

    output: {
        path: __dirname + '/src/main/resources/static/',
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        port: 7777,
        historyApiFallback: true,
        contentBase: [
                __dirname + '/src/main/resources/static',
                __dirname + '/src/main/resources/templates',
            ],
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false
            },
            '/handleLogin': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    plugins: [
                        // arrow function - class { handleClick = () => { } }
                        'transform-class-properties',

                        // object spread operator - { ...state, key, value }
                        'transform-object-rest-spread'
                        ]
                }
            },
            {
                test: /\.css$/,
                // loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                use: [
                    { loader: 'style-loader'},
                    { loader: 'css-loader'}
                ]
            }
        ]
    }
}
