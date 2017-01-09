const path = require('path');

const html_modify = require('html-webpack-plugin');
const webpack = require('webpack');
const loader_option = webpack.LoaderOptionsPlugin;
const uglify = webpack.optimize.UglifyJsPlugin;
const no_error_out = webpack.NoErrorsPlugin;
const hot_loading = webpack.HotModuleReplacementPlugin;
const const_def = webpack.DefinePlugin;
const named_module = webpack.NamedModulesPlugin;
const common_chunking = webpack.optimize.CommonsChunkPlugin;

const fullpath = (suffix) => (require('path').join(__dirname, suffix));
const hotentry = (suffix) => (['babel-polyfill', fullpath(suffix) ]);

const config = {
    entry: {
        vendor: [ 'react', 'react-dom', 'moment'],
        about : hotentry('./test/about.js'),
        app : hotentry('./test/app.js')
    },
    output: {
        publicPath : '/',
        path: fullpath("dist/"),
        filename: "[chunkhash].[name].js"
    },
    module :  {
        rules : [
            {
                test : /\.(js|jsx)$/,
                use : [ "react-hot-loader/webpack", "babel-loader" ],
                exclude: /node_modules/
            },
            {
                test :/\.css$/,
                use : [ "style-loader", "css-loader?modules", "postcss-loader"]
            },
            {
                test :/\.scss$/,
                use : [ "style-loader", "css-loader", "sass-loader"]
            },
            {
                test :/\.woff2?$/,
                use : [ "url-loader" ]
            },
            {
                test :/\.(ttf|eot|svg)$/,
                use : [ "file-loader" ]
            },
        ]
    },
    plugins : [
        new const_def({
            'process.env.NODE_ENV' : JSON.stringify('development') }),        
        new loader_option({
            // debug : true,
            minimize: false }),
        new named_module(),
        new no_error_out(),
        new uglify({
            sourceMap: true }),
        new hot_loading(),        
        new html_modify({
            template : fullpath('./test/about.template.html'),
            chunks : [ 'vendor', 'commons', 'about' ],
            filename : 'about.html'}),
        new html_modify({
            template : fullpath('./test/index.template.html'),
            chunks : [ 'vendor', 'commons', 'app' ],            
            filename : 'index.html'}),
        new common_chunking({
            chucks : ['vendor', 'app', 'about'],
            name : "commons", 
            filename: '[hash].commons.js'
        })
    ],

    performance: { hints: false },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: fullpath("./"),
        historyApiFallback: true,
        port: 8080,
        hot: true,
        inline: true,
        stats : {
            chunks: false,
            chunkModules : false
        }
    }
};

module.exports = config;
