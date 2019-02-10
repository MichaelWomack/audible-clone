module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        publicPath: '/',
    },
};
