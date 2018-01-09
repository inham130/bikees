const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack')
const path = require('path');

module.exports = {
    entry: {
        main: [
            './src/js/app.js',
            './src/styles/styles.scss'
        ]
    },

    output: {
        path: __dirname + '/public',
        filename: './[name].js'
    },

    
    devtool: "cheap-inline-module-source-map",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                              config: {
                                path: 'postcss.config.js'
                              }
                            }
                        },
                        'sass-loader'
                    ]
                  })
            },
            {
                test: /.(jpg|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                  loader: 'url-loader',
                  options: {
                    name: '[name].[ext]'
                  }
                }]
              }, 
        ]
    },

    devServer: {
        host: 'localhost',
        port: 9000,
        inline: true,
        hot: true,
        open: true
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
};