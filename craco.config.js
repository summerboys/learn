const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const CracoLessPlugin = require('craco-less');
const { ESLINT_MODES, whenDev, whenProd, when } = require('@craco/craco');
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const modifiedTheme = {};

function getPublicPath() {
    if (process.env.GIT_BRANCH) {
        return process.env.REACT_APP_ONLINE || process.env.GIT_BRANCH === 'test'
            ? '/'
            : `/tutor-mars-react/${process.env.GIT_BRANCH}/`;
    } else {
        return '/';
    }
}

module.exports = {
    plugins: [
        // less
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                        modifyVars: modifiedTheme,
                    },
                },
            },
        },
        {
            plugin: CracoLessPlugin,
            options: {
                modifyLessRule(lessRule, _context) {
                    lessRule.test = /\.module\.less$/;
                    lessRule.use = [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            },
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    modifyVars: modifiedTheme,
                                    javascriptEnabled: true,
                                },
                            },
                        },
                    ];
                    lessRule.exclude = /node_modules/;
                    return lessRule;
                },
            },
        },
    ],
    webpack: {
        plugins: [
            // ??????
            new SimpleProgressWebpackPlugin(),
            //????????????
            //  new BundleAnalyzerPlugin(),
        ],
        configure: (webpackConfig, { env, paths }) => {
            // ??????build????????????
            const newPath = `${paths.appPath}/dist/tutor-mars-react`;
            webpackConfig.output = {
                ...webpackConfig.output,
                path: newPath,
                // test online ????????????????????? ?????????????????????project???branch ??????publicPath
                publicPath: getPublicPath(),
            };
            paths.appBuild = newPath;
            if (process.env.NODE_ENV === 'production') {
                webpackConfig.devtool = false;
            }
            return webpackConfig;
        },
    },
    // ????????????????????? .eslintrc.js
    eslint: {
        mode: ESLINT_MODES.file,
        loaderOptions: (eslintOptions) => {
            // ????????????????????? .eslintignore
            eslintOptions.ignore = true;
            return eslintOptions;
        },
    },
    devServer: {
        host: 'local.zhenguanyu.com',
        port: 3000,
    },
    // ????????????
    babel: {
        plugins: [
            [
                'import',
                {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true, //?????????true??????less
                },
            ],
        ],
    },
};
