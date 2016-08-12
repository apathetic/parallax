import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/parallax.js',
  moduleName: 'Parallax',
  plugins: [
    buble()
  ],

  targets: [
    { dest: 'dist/parallax.cjs.js', format: 'cjs' },
    { dest: 'dist/parallax.es6.js', format: 'es' },
    { dest: 'dist/parallax.js', format: 'iife' }
  ]
};
