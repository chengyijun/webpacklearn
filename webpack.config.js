const path = require("path")
// html打包插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包前清空dist插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// css单独打包插件 MiniCssExtractPlugin.loader 替代了 style-loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


function getStyleLoaders(pre) {
    return [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        require("postcss-preset-env")
                    ]
                }
            },
        },
        pre
    ].filter(Boolean)
}



module.exports = {
    // 入口
    // 要求必须是相对路径 相对于 webpack.config.js
    entry: "./src/main.js",

    // 输出
    // 要求必须是绝对路径
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "static/main.js",
    },

    // 加载器
    module: {
        rules: [
            // 支持scss文件
            {
                test: /\.css$/,
                use: getStyleLoaders(),
            },
            // 支持scss文件
            {
                test: /\.s[ac]ss$/i,
                use: getStyleLoaders('sass-loader'),
            },
            // 支持ts
            {
                test: /\.tsx?$/,    // .ts或者tsx后缀的文件，就是typescript文件
                use: "ts-loader",   // 就是上面安装的ts-loader
                exclude: "/node-modules/" // 排除node-modules目录
            },

            // 支持图片资源
            {
                test: /\.(jpg|png|jpeg)$/,
                loader: 'url-loader',
                options: {
                    // 16kb一下
                    limit: 8 * 1024,
                    esModule: false,
                    name: 'static/[hash:9].[ext]'
                },
                type: 'javascript/auto'
            },
            // 处理html中的html标签节点
            {
                test: /\.html$/,
                loader: 'html-loader'
            },

            // babel 处理js兼容性
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env']
                    // }
                }
            }

        ]
    },

    // 插件
    plugins: [
        // 打包前清空 dist
        new CleanWebpackPlugin(),
        // 自动打包 index.html 文件
        new HtmlWebpackPlugin(
            {
                template: path.join(__dirname, 'public/index.html'),
            }
        ),
        // css 单独打包
        new MiniCssExtractPlugin({
            filename: "static/main.css"
        })

    ],


    // 开发服务器
    devServer: {
        host: "localhost",
        port: "3000",
        open: true,
    },

    // 模式
    mode: "development"
}