const path = require('path');

const html_modify = require('html-webpack-plugin');
const webpack = require('webpack');
const loader_option = webpack.LoaderOptionsPlugin;
const uglify_js = webpack.optimize.UglifyJsPlugin;
const no_error_out = webpack.NoErrorsPlugin;
const hot_replacing = webpack.HotModuleReplacementPlugin;
const const_def = webpack.DefinePlugin;
const named_module = webpack.NamedModulesPlugin;
const common_chunking = webpack.optimize.CommonsChunkPlugin;

const extends_config = function(parent, child) {
    // return { ...parent, child }; // TBD: es2105
    return Object.assign( {}, parent, child);
};

const config_blank = {
    entry : {// user must specify 
        main : undefined 
    },
    output: { // user must specify
        path : undefined,
        filename : undefined,
        publicPath : undefined
    }, 
    plugins: [],
    module: {
        rules : []
    },
    devServer: undefined,
    devtool: undefined,
    amd: undefined,
    bail: undefined,
    cache: undefined,
    context: undefined,
    dependencies: undefined,
    externals: undefined,
    loader: undefined,
    name: undefined,
    node: undefined,
    performance: undefined,
    profile: undefined,
    recordsInputPath: undefined,
    recordsOutputPath: undefined,
    recordsPath: undefined,
    resolve: undefined,
    resolveLoader: undefined,
    stats: undefined,
    target: undefined,
    watch: undefined,
    watchOptions: undefined
};

const config_default = extends_config(
    config_blank,
    {
        module :  {
            rules : [
                {
                    test : /\.(js|jsx)$/,
                    use : [ { loader : "react-hot-loader/webpack" },
                            { loader : "babel-loader", options : { presets : ["env", "react"] } } ],
                    exclude: /node_modules/
                },
                {
                    test : /\.css$/,
                    use : [ "style-loader", "css-loader?modules", "postcss-loader" ]
                },
                {
                    test : /\.scss$/,
                    use : [ "style-loader", "css-loader", "sass-loader" ]
                },
                {
                    test : /\.woff2?$/,
                    use : [ "url-loader" ]
                },
                {
                    test : /\.(ttf|eot|svg)$/,
                    use : [ "file-loader" ]
                },
            ]
        }
    }
);

const config_react = extends_config(
    config_default,
    {
        plugins : [
            new const_def({
                'process.env.NODE_ENV' : JSON.stringify('development') }),        
            new loader_option({
                // debug : true,
                minimize: false }),
            new named_module(),
            new no_error_out(),
            new uglify_js({
                sourceMap: true }),
        ]
    }
);

const config_react_hot = extends_config(
    config_react,
    {
        plugins : [
            new hot_replacing(),            
            ...config_react.plugins
        ]
    }
);

module.exports = {
    config_blank,
    config_default,
    config_react,
    config_react_hot
};
