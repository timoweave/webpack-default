const path = require('path');
const teselecta = require('teselecta');

const webpack = require('webpack');
const common_chunking = webpack.optimize.CommonsChunkPlugin;
const html_fetching = require('html-webpack-plugin');

const WebpackDefault = require('./src/webpack-default.js');

const config = new WebpackDefault(
    {
        entry : { 
            vendor : [ 'react', 'react-dom', 'moment'],
            about : [ path.join(__dirname, './test/about.js') ],
            app : [ path.join(__dirname, './test/app.js') ]
        },
        output : {
            publicPath : '/',
            path : path.join(__dirname, "dist/"),
            filename: "[chunkhash].[name].js"
        },
        module : { rules : [  /* NOTE: config.module.rules.push(this.module.rules) */
        ] },
        plugins : [ /* config.plugins.push(this.plugins) */
            new html_fetching({
                template : path.join(__dirname, './test/about.template.html'),
                chunks : [ 'vendor', 'commons', 'about' ],
                filename : 'about.html'}),
            new html_fetching({
                template : path.join(__dirname, './test/index.template.html'),
                chunks : [ 'vendor', 'commons', 'app' ],            
                filename : 'index.html'}),
            new common_chunking({
                chucks : ['vendor', 'app', 'about'],
                name : "commons", 
                filename: '[hash].commons.js'
            })
        ]
    },
    {
        dirname : __dirname,
        port : 8080,
        inspect : true
    }
);


console.log(teselecta(config));
module.exports = config;
