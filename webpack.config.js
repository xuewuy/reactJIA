//https://webpack.github.io/docs/library-and-externals.html

var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')
//var config = require('./web.config.js')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const HappyPack = require('happypack')

var projectRootPath = path.resolve(__dirname, './');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './src/index.js'
        //vendor:vendors,
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        //publicPath: config.RootPath + '/dist/',
        filename: '[name].[hash:8].bundle.js',
        chunkFilename: '[name].[hash:8].chunk.js'
    },
    module: {
        noParse: [
            /node_modules\/moment\//,
            /node_modules\/immutable\//,
            // /node_modules\/lodash\//,

        ],
        loaders: [
            {
                test: /\.(js|jsx)$/,
                //loader: 'babel-loader',
                 loader: 'happypack/loader',
                 cacheDirectory: true,
                exclude: function (path) {
                    // 路径中含有 node_modules 的就不去解析。
                    var isNpmModule = !!path.match(/node_modules/);
                    return isNpmModule;
                },
                include: [
                    // 只去解析运行目录下的 src文件夹
                    path.resolve(__dirname, './src'),
                ],
                query: {
                    plugins: ['transform-runtime', 'transform-decorators-legacy', 'antd', 'add-module-exports'],
                    presets: ['react', 'es2015', 'stage-0'],
                    compact: false,
                    ignore: [
                        "jquery.js",
                        "jquery.min.js",
                        "bootstrap.js",
                        "bootstrap.min.js",
                        "qrcode.min.js"
                    ]
                }
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.(jpg|png|svg|woff|woff2|ttf|eot|gif)$/,
                exclude: /node_modules/,
                loader: "url-loader?limit=8192&name=[name].[hash:8].[ext]" //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
        ]
    },
    externals: {
        //'react':'React',
        //'react-dom':'ReactDOM'

    },
    resolve: {
        //root: 'D:/code/rrtimes/src/web/src', //绝对路径
        extensions: ['', '.js', '.jsx'],
        alias: {
            xComponent: path.resolve(projectRootPath, './src/component/index.js'),
            appLoader: path.resolve(projectRootPath, './src/appLoader/index.js'),
            defaultComponentFactory: path.resolve(projectRootPath, './src/apps/dynamicUI/defaultComponentFactory.js'),
            dynamicComponent: path.resolve(projectRootPath, './src/apps/dynamicUI/index.js'),
            dynamicAction: path.resolve(projectRootPath, './src/apps/dynamicUI/action.js'),
            dynamicReducer: path.resolve(projectRootPath, './src/apps/dynamicUI/reducer.js'),
            webapi: path.resolve(projectRootPath, './src/api/index.js'),
            antd: path.resolve(projectRootPath, './node_modules/ziaochina-antd'),
            'echarts-for-react': path.resolve(projectRootPath, './node_modules/echarts-for-react'),
            'constant':path.resolve(projectRootPath,'./src/constant.js')
        },
        modulesDirectories: ['node_modules'],
        fallback: path.resolve(projectRootPath, './node_modules'),
    },
    resolveLoader: {
        root: path.resolve(projectRootPath, './node_modules'),
    },
    devServer: {
        contentBase: './dist/',
        hot: true,
        historyApiFallback: true,
        inline:true,
        disableHostCheck: true
    },

    plugins: [
        new CopyWebpackPlugin([{
            context: './src/vendor',
            from: '**/*',
            to: 'vendor'
        }, {
            context: './src/assets/iconfont',
            from: '**/*',
            to: 'iconfont'
        }, {
            context: './src/assets/rriconfont',
            from: '**/*',
            to: 'rriconfont'
        }, {
            context: './src/assets/files',
            from: '**/*',
            to: 'files'
        }, {
            context: './src/share',
            from: '**/*',
            to: 'share'
        }, {
            context: './src/static',
            from: '**/*',
            to: 'static'
        },{
            context:'./src/assets/root',
            from:'**/*',
            to:''
        }]),

        //这个插件用来寻找相同的包和文件，并把它们合并在一起
        new webpack.optimize.DedupePlugin(),
        //这个插件根据包/库的引用次数 来优化它们
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        //生产环境
        new webpack.DefinePlugin({
            // 'process.env': {
            //     'NODE_ENV': JSON.stringify('production'),
            // },
            'process.env.NODE_ENV':JSON.stringify('production'),
        }),
        new HtmlWebpackPlugin({
            title: 'xuewuying', //标题
            favicon: './src/assets/img/favicon.ico', //favicon路径
            filename: './index.html', //生成的html存放路径，相对于 path
            template: './src/index.html', //html模板路径
            inject: true, //允许插件修改哪些内容，包括head与body`
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        //,
        new ExtractTextPlugin('vendor.css'),

        new HappyPack({
            loaders: ['babel?presets[]=es2015,presets[]=react,presets[]=stage-0,plugins[]=transform-decorators-legacy'],
            threads: 8/* ,
            debug:true */
        }),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/vendor/libs/react-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/vendor/libs/immutable-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/vendor/libs/moment-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/vendor/libs/redux-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/vendor/libs/echarts-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/vendor/libs/zrender-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/vendor/libs/md5-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/vendor/libs/classnames-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/vendor/libs/lodash-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/vendor/libs/objectassign-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/vendor/libs/es6promise-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/vendor/libs/corejs-manifest.json'),
        }),
    ],
    postcss: function () {
        return [autoprefixer];
    },

};
