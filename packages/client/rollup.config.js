const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const { eslint } = require('rollup-plugin-eslint');
const { terser } = require('rollup-plugin-terser');
const replace = require('rollup-plugin-replace');
const copy = require('rollup-plugin-copy');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { name, version, homepage } = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';
module.exports = ['background', 'popup', 'active', 'danmu'].map(item => {
    return {
        input: `src/${item}/dev/index.js`,
        output: {
            name: `BilibiliLiveHime${item[0].toUpperCase()}${item.slice(1)}`,
            file: isProd ? `dist/${name}/${item}/index.js` : `src/${item}/index.js`,
            format: 'iife',
            sourcemap: !isProd,
        },
        plugins: [
            eslint({
                exclude: ['node_modules/**', 'src/**/dev/*.scss'],
            }),
            nodeResolve(),
            commonjs(),
            babel({
                runtimeHelpers: true,
                exclude: 'node_modules/**',
                presets: [
                    [
                        '@babel/env',
                        {
                            modules: false,
                        },
                    ],
                ],
                plugins: ['@babel/plugin-external-helpers', '@babel/plugin-transform-runtime'],
            }),
            replace({
                __ENV__: JSON.stringify(process.env.NODE_ENV),
            }),
            postcss({
                plugins: [
                    autoprefixer(),
                    cssnano({
                        preset: 'default',
                    }),
                ],
                sourceMap: !isProd,
                extract: isProd ? `dist/${name}/${item}/index.css` : `src/${item}/index.css`,
            }),
            isProd &&
                terser({
                    output: {
                        preamble:
                            '/*!\n' +
                            ` * bilibili-live-hime v${version}\n` +
                            ` * Github: ${homepage}\n` +
                            ` * (c) 2018-${new Date().getFullYear()} Harvey Zack\n` +
                            ' * Released under the MIT License.\n' +
                            ' */\n',
                        comments: () => false,
                    },
                }),
            isProd &&
                copy({
                    targets: [
                        {
                            src: [`src/${item}/*.html`],
                            dest: `dist/${name}/${item}/`,
                        },
                        {
                            src: [`src/icons`, `src/manifest.json`],
                            dest: `dist/${name}/`,
                        },
                    ],
                    hook: 'writeBundle',
                }),
        ],
    };
});
