const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvWebpack = require('dotenv-webpack');
const merge = require('webpack-merge');
const environmentConfig = env => require(`./webpack.${env}.js`);

module.exports = (env, argv) => {
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
                path: `.${env.ENVIRONMENT}.env`,
            }),
        ],
    };
    console.log('ENVIRONMENT: ', env.ENVIRONMENT);
    const envConfig = environmentConfig(argv.mode);
    const merged = merge(config, envConfig);
    return merged;
};
