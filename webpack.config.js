var path = require('path');

module.exports = {
    entry: [
        './src/main/js/index.js',
    ],

    output: {
        path: __dirname + '/src/main/resources/static/built/',
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        port: 7777,
        contentBase: [
                __dirname + '/src/main/resources/static',
                __dirname + '/src/main/resources/templates',
            ],
        proxy: {
            '/api': {
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
            }
        ]
    }
}
