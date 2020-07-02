import external from 'rollup-plugin-peer-deps-external';
import ts from 'rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';
import tsconfig from './tsconfig.json';

const production = !process.env.ROLLUP_WATCH;

const input = 'src/index.ts';

function resolveEntries() {
  return Object.entries(
    tsconfig.compilerOptions.paths
  ).map(([find, [replacement]]) => ({ find, replacement }));
}

export default [
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      external(),
      ts(),
      alias({
        resolve: ['.ts', '.tsx'],
        entries: resolveEntries(),
      }),
      commonjs({
        include: ['node_modules/**'],
      }),
      production && filesize(),
    ],
  },
  {
    input,
    output: { file: pkg.browser, name: 'ThreeDatGUI', format: 'umd' },
    plugins: [
      external(),
      ts(),
      alias({
        resolve: ['.ts', '.tsx'],
        entries: resolveEntries(),
      }),
      resolve(),
      commonjs({
        include: ['node_modules/**'],
      }),
      terser(),
      production && filesize(),
    ],
  },
];
