const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvWebpack = require('dotenv-webpack');
const merge = require('webpack-merge');
const environmentConfig = env => require(`./webpack.${env}.js`);

module.exports = env => {
    const config = {
        entry: {
            app: './src/index.tsx',
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'public'),
            publicPath: '/'
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'awesome-typescript-loader',
                    exclude: /node_modules/,
                },
                {
                    enforce: 'pre',
                    test: /\.js%/,
                    loader: 'source-map-loader',
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: 'file-loader',
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    exclude: /\.d.ts$/,
                    use: [
                        {
                            loader:
                                env.NODE_ENV === 'production'
                                    ? MiniCssExtractPlugin.loader
                                    : 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName:
                                    '[name]_[local]_[hash:base64:5]',
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                modules: true,
                            },
                        },
                        {
                            loader: 'typed-css-modules-loader',
                            options: { camelCase: true, noEmit: true },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './src/index.html' }),
            new CleanWebpackPlugin(['./public']),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
            new DotenvWebpack({
                path: `.${env.NODE_ENV}.env`,
            }),
        ],
    };

    const envConfig = environmentConfig(env.NODE_ENV);
    const merged = merge(config, envConfig);
    return merged;
};
