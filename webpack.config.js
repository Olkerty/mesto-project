// webpack.config.js
const path = require('path'); // ���������� path � ������� ������
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/scripts/script.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development',
    devServer: {
      //  contentBase: path.resolve(__dirname, './dist'), // ����, ���� "�������" ����� ������������
        compress: true, // ��� ������� �������� � ������ ����������
        port: 8080, // ����, ����� ��������� ���� �� ������ localhost:8080, �� ����� �������� ����

        open: true // ���� ����� ����������� ��� ��� ������� npm run dev
    },
    module: {
        rules: [ // rules � ��� ������ ������
            // ������� � ���� ������ ������ ��� ������
            {
                // ���������� ���������, ������� ���� ��� js �����
                test: /\.js$/,
                // ��� ��������� ���� ������ ����� ������������ babel-loader
                use: 'babel-loader',
                // ��������� ����� node_modules, ����� � ��� ������������ �� �����
                exclude: '/node_modules/'
            },
            {
                // ���������� ���������, ������� ���� ��� ����� � ������ ������������
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                // ��������� ��� ������� ������ � CSS-������
                test: /\.css$/,
                // ��� ��������� ���� ������ ����� ������������
                // MiniCssExtractPlugin.loader � css-loader
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {importLoaders: 1}
                },
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // ���� � ����� index.html
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(), 
    ]
}

// ���������� ����� ������, ��������� ������� path