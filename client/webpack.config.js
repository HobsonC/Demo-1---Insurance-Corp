const path = require('path')

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js'
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env','stage-0','react']
                }
            }
        ]
    },
    output: {
        path: path.join(__dirname,'dist'),
        publicPath: path.join(__dirname,'dist'),
        filename: 'bundle.js'
    }
}