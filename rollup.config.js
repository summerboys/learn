import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
// import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import postcss from 'rollup-plugin-postcss';

const pkg = require('./package.json');

const tasks = [
    {
        input: './src/main.ts', // #(组件主入口，相对路径)
        output: {
            file: './dist/main.js',
            format: 'es',
            sourcemap: true,
            // 添加globals
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                axios: 'axios',
                moment: 'moment',
            },
        },
        external: Object.keys(pkg.dependencies)
            .concat(Object.keys(pkg.peerDependencies))
            .concat(['@ant-design/icons', 'react/jsx-runtime', 'moment']),
        plugins: [
            typescript({
                include: ['*.ts+(|x)', '**/*.ts+(|x)'],
                tsconfig: './tsconfig.build.json',
            }),
            postcss({
                modules: true,
                use: {
                    less: {
                        javascriptEnabled: true,
                    },
                },
            }),
            babel({
                exclude: 'node_modules/**',
                extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
                presets: ['@babel/env', '@babel/preset-react'],
            }),
            // 压缩貌似导致了某些 antd 输出的问题
            // terser(),
        ],
    },
];

export default tasks;
