const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode:'production', // 生产模式
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: '[name].[hash:8].js'
  },

  externals: {
    vue: 'Vue',
    'element-ui':'ELEMENT'
  },

  
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),

    new BundleAnalyzerPlugin({
      analyzerHost: '127.0.0.1',
      analyzerPort: '7000'
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [path.resolve(__dirname, 'src')],//指定检查的目录
        options: {
          formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        },
        exclude: /node_modules/ 
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        loader: 'url-loader'
      },
      {
        loader: 'postcss-loader',
        options: {
            plugins:  {
              'postcss-pxtorem': {
                // 750设计标准
                rootValue: 75,
                // 转换成的rem后，保留小数点后几位
                unitPrecision: 5,
                /**
                * 将会被转换的css属性列表，
                * 设置为*表示全部，['*','*position*','!letter-spacing','!font*']
                * *position* 表示所有包含 position 的属性
                * !letter-spacing 表示非 letter-spacing 属性
                * !font* 表示非font-size font-weight ... 等的属性
                * */
                propList: ['*', '!letter-spacing'],
                // 不会被转换的class选择器名，支持正则
                selectorBlackList: ['.rem-'],
                replace: true,
                // 允许在媒体查询中转换`px`
                mediaQuery: false,
                // 小于1px的将不会被转换
                minPixelValue: 1
            }
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
