import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StatoscopePlugin from '@statoscope/webpack-plugin';

const config: webpack.Configuration = {
    mode: 'production',
    entry: {
        root: './src/pages/root2.tsx',
        root2: './src/pages/root2.tsx',
      },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
    ],

    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(tsx?)$/,
                use: ['i18n-loader'],
                exclude: ['/node_modules/'],
            },
            {
                test: /\.(tsx?)$/,
                use: ['ts-loader'],
                exclude: ['/node_modules/'],
            },
        ],
    },
    resolveLoader: {
        alias: {
            'i18n-loader': path.resolve(__dirname, 'loaders/i18n-loader.cjs'),
        },
    },
};

export default config;
