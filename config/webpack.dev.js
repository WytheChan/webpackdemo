const path = require('path');
const uglify = require('uglifyjs-webpack-plugin'); //js压缩
const htmlPlugin = require('html-webpack-plugin'); //html打包
const extractTextPlugin = require('extract-text-webpack-plugin'); //css分离
const PUBLIC_PATH = '/test/';
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
        
        mode: 'development',
        entry: {
            main: './src/main.js'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'bundle.js',
            publicPath: PUBLIC_PATH
        },
        module: {
            rules: [{ //处理css
                    test: /\.css$/,
                    use: extractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                                loader: "css-loader"
                            },
                            {
                                loader: "postcss-loader",
                            },
                        ]
                    })
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
                test:/\.(jsx|js)$/,
               use:{
                   loader:'babel-loader',
               },
               exclude:/node_modules/
            }
        ]
    },
    plugins: [
        new uglify(),
        new htmlPlugin({
            minify: {
                removerAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new extractTextPlugin("css/index.css"), //这是分离后的路径
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, "src/*.html"))
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        compress: true,
        port: 8888,
        proxy: {
            '/home': {
                target: 'http://b.hj288.cn/hy/public/index.php/index/Index',
                pathRewrite: { '^/home': '' },
                changeOrigin: true
            },
        },
    }
}