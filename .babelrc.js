const commonjs = process.env.BABEL_ENV !== 'esm';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        shippedProposals: true,
        modules: commonjs ? 'commonjs' : false,
        targets: {
          browsers: ['last 4 versions', 'not ie <= 8']
        }
      }
    ],
    [
      '@babel/preset-react',
      { development: process.env.NODE_ENV !== 'production' }
    ]
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-transform-runtime', { useESModules: !commonjs }],
    'babel-plugin-dev-expression',
    commonjs && 'babel-plugin-add-module-exports',
    process.env.NODE_ENV === 'test' && 'babel-plugin-istanbul'
  ].filter(Boolean)
};
