var path = require("path")
const webpack = require('webpack')

//以数组方式统一导入时抛出N多异常，原因是开源模块依赖关系，存在先后顺序
// const vendors = [
//   'react',
//   'react-dom',
//   'immutable',
//   'ziaochina-antd',
//   'echarts-for-react',
//   'moment',
//   'isomorphic-fetch',
//   'react-redux',
//   "redux-logger",
//   'redux',
//   "whatwg-fetch"
//   // ...其它库
// ];

/*
   * output.library
   * 将会定义为 window.${output.library}
   * 在这次的例子中，将会定义为`window.[name]_[chunkhash]`
*/
module.exports = {
  entry: {
    //vendor: vendors,
    'jquery': ['jquery'],
    'react': ['react'],
    //'reactdom': ['ReactDOM'],
    'redux': ['redux'],
    'zrender': ['zrender'],
    'echarts': ['echarts'],
    'immutable': ['immutable'],
    'moment': ['moment'],
    'md5': ['md5'],
    'classnames': ['classnames'],
    'lodash': ['lodash'],
    'objectassign': ['object-assign'],
    'es6promise': ['es6-promise'],
    'corejs':['core-js']

    // 'rctable':['rc-table'],
    // 'antd':['ziaochina-antd'],
    //"react-redux": ['react-redux'],
    // "babel-polyfill": ['window'],
    // "whatwg-fetch": ['fetch'],
  },
  output: {
    path: 'src/vendor/libs/',
    filename: '[name].dll.js',
    library: '[name]_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      /**
         * path
         * 定义 manifest 文件生成的位置
         * [name]的部分由entry的名字替换
      */
      path: 'src/vendor/libs/[name]-manifest.json',
      /**
      * name
      * dll bundle 输出到那个全局变量上
      * 和 output.library 一样即可。 
      */
      name: '[name]_lib',
      context: __dirname
    }),
      //生产环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            }
        }),

        //代码丑化=webpack -p
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap:false,
            compressor: {
                drop_debugger: true,
                warnings: false,
                drop_console: true
            }
        }),
  ],
};
