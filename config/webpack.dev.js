const path = require('path');
const uglify = require('uglifyjs-webpack-plugin'); //js压缩
const htmlPlugin = require('html-webpack-plugin'); //html打包
const extractTextPlugin = require('extract-text-webpack-plugin'); //css分离
// const PUBLIC_PATH = '/test/';
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let crossURL = 'http://b.hj288.cn/hy/public/index.php/index/Index'

module.exports = {

  mode: 'development',
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    // publicPath: PUBLIC_PATH
  },
  module: {
    rules: [{ // loader sass and css
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader?modules=false',
            options: {
              importLoaders: 1,
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, './postcss.config.js')
              }
            },
          },
          "sass-loader",
          {
            loader: 'sass-resources-loader',
            options: {
              // 多个文件时用数组的形式传入，单个文件时可以直接使用 path.resolve(__dirname, '../static/style/common.scss'
              resources: path.resolve(__dirname, '../src/scss/base.scss')
            }
          }
        ]
      },
      { //处理图片
        test: /\.(png|jpg|gif|jpeg)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 500,
            outputPath: 'img' //打包后图片的存放路径
          }
        }]
      },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      },
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      },
      // {
      //     test: /\.(eot|svg|ttf|woff)$/,
      //     use: [{
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[ext]",
      //         publicPath: "../fonts/",
      //         outputPath: "fonts/"
      //       }
      //     }]
      //   },
      {
        test: /\.mp3$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "img/[name].[ext]",
          }
        }]
      }

    ]
  },
  plugins: [
    // new uglify(),
    new htmlPlugin({
      minify: {
        removerAttributeQuotes: true
      },
      hash: true,
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    // new PurifyCSSPlugin({
    //     paths: glob.sync(path.join(__dirname, "src/*.html"))
    // }),

  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    host: 'localhost',
    compress: true,
    port: 8888,
    proxy: { // agent cross-domain interface
      "/": {
        target: crossURL,
        changeOrigin: true,
        pathRewrite: {
          "^/": ""
        }
      }
    },
    // proxy: {
    //     '/home': {
    //         target: 'http://b.hj288.cn/hy/public/index.php/index/Index',
    //         pathRewrite: { '^/home': '' },
    //         changeOrigin: true
    //     },
    // },
  }
}