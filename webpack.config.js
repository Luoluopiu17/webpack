const { VueLoaderPlugin } = require('vue-loader')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    join
} = require('path')
const {
    resourceUsage
} = require('process')
module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        path: join(__dirname, 'lib'),
        filename: 'webpack-demo.js',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: join(__dirname, 'public/index.html')
        }),
        new EslintWebpackPlugin({
            context: join(__dirname,'src/')
        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        port: 65530, // 端口号
        open: true
    },
    module: {
        rules: [{
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/i,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/i,
                // type: "asset/resource"
                // type: "asset/inline"
                type: "asset",
                // parser: {
                //     dataUrlCondition: {
                //         maxSize: 21 * 1024
                //     }
                // }
                generator: {
                    filename: 'images/[hash:6][ext]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: 'fonts/[hash:6][ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['@babel/preset-env'] // 预设:转码规则(用bable开发环境本来预设的)
                //     }
                // }
                use: ["babel-loader"]
            },
            {
                test:/\.vue/i,
                use: ['vue-loader']
            }
        ]
    }
}