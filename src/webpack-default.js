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

class WebpackDefault {

    constructor({ entry, output, module, plugins, devServer, devtool, amd, bail, cache,
                  context, dependencies, externals, loader, name, node, performance,
                  profile, recordsInputPath, recordsOutputPath, recordsPath, resolve,
                  resolveLoader, stats, target, watch, watchOptions
                },
                { dirname, port, debug, hot, sourcemap, minimize}) {
        
        const config = {
            entry, output, module, plugins,
            devServer, devtool,
            amd, bail, cache, context, dependencies, externals, loader, name,
            node, performance, profile, recordsInputPath, recordsOutputPath,
            recordsPath, resolve, resolveLoader, stats, target, watch, watchOptions
        };
        const params = {
            dirname,
            port: port || 8080, debug: debug || true, hot: hot || true,
            sourcemap: sourcemap || true, minimize: minimize || true
        };

        this.check_config(config);
        this.check_params(params);
        
        this.init_defaults(params);
        this.init_dev(params);
        this.init_config(config);
    }
    
    init_defaults(params) {

        this.entry = {};
        this.output = {};
        this.module = {};
        this.plugins = [];
        
        this.module.rules = this.init_module_rules();
        this.plugins = this.init_plugins(params);
    }

    init_dev(params) {
        
        this.performance = { hints: false };
        this.devtool = 'cheap-module-eval-source-map';
        this.devServer = {
            // contentBase: path.join(params.dirname, "./"),
            historyApiFallback: true,
            port: params.port,
            hot: true,
            inline: true,
            stats: {
                chunks: false,
                chunkModules: false
            }
        };
    }

    init_config(config) {
        this.entry = config.entry;
        this.output = config.output;

        if (config.module.rules.length > 0) {
            this.module.rules.push(...config.module.rules);
        }
        if (config.plugins.length > 0) {
            this.plugins.push(...config.plugins);
        }
    }

    init_module_rules() {
        const rules = [
            {
                test: /\.(js|jsx)$/,
                use: [ "react-hot-loader/webpack", "babel-loader" ],
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use: [ "style-loader", "css-loader?modules", "postcss-loader"]
            },
            {
                test:/\.scss$/,
                use: [ "style-loader", "css-loader", "sass-loader"]
            },
            {
                test:/\.woff2?$/,
                use: [ "url-loader" ]
            },
            {
                test:/\.(ttf|eot|svg)$/,
                use: [ "file-loader" ]
            }
        ];
        return rules;
    }
    
    init_plugins(params) {
        const plugins = [
            new const_def({
                'process.env.NODE_ENV': JSON.stringify(((params.debug) ? 'development': 'production')) }),
            new loader_option({
                debug: params.debug,
                minimize: params.minimize }),
            new named_module(),
            new no_error_out(),
            new uglify({
                sourceMap: params.source_map })
        ];

        if (params.hot) {
            plugins.push(new hot_loading());
        }
        return plugins;
    }

    check_config(config) {
        if ((config.entry === undefined) ||
            (Object.keys(config.entry).length === 0)) {
            throw new Error("must specify config.entry");
        }
        if ((config.output === undefined) ||
            (Object.keys(config.output).length === 0)) {
            throw new Error("must specify config.output");
        }
    }
    
    check_params(params) {
        if ((params.dirname === undefined) ) {
            throw new Error("must specify params.dirname");
        }
    }

}

module.exports = WebpackDefault;
