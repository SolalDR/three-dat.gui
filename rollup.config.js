import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [babel(), production && filesize()]
  },
  {
    input: 'src/index.js',
    output: { file: pkg.browser, name: 'Events', format: 'umd' },
    plugins: [
      resolve(),
      babel(),
      commonjs(),
      terser(),
      production && filesize()
    ]
  }
];
