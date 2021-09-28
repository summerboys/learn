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
            // 进度
            new SimpleProgressWebpackPlugin(),
            //打包分析
            //  new BundleAnalyzerPlugin(),
        ],
        configure: (webpackConfig, { env, paths }) => {
            // 设置build输出目录
            const newPath = `${paths.appPath}/dist/tutor-mars-react`;
            webpackConfig.output = {
                ...webpackConfig.output,
                path: newPath,
                // test online 部署路径不变、 分支部署时根据project和branch 生成publicPath
                publicPath: getPublicPath(),
            };
            paths.appBuild = newPath;
            if (process.env.NODE_ENV === 'production') {
                webpackConfig.devtool = false;
            }
            return webpackConfig;
        },
    },
    // 加载根目录下的 .eslintrc.js
    eslint: {
        mode: ESLINT_MODES.file,
        loaderOptions: (eslintOptions) => {
            // 加载根目录下的 .eslintignore
            eslintOptions.ignore = true;
            return eslintOptions;
        },
    },
    devServer: {
        host: 'local.zhenguanyu.com',
        port: 3000,
    },
    // 按需加载
    babel: {
        plugins: [
            [
                'import',
                {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true, //设置为true即是less
                },
            ],
        ],
    },
};
