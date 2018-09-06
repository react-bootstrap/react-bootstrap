module.exports = api => {
  let dev = false;
  let modules = true;

  switch (api.env()) {
    case 'docs':
    case 'test':
      dev = true;
      modules = false;
      break;
    case 'dist-dev':
      dev = true;
      modules = false;
      break;
    case 'dist-prod':
    case 'esm':
      modules = false;
      break;
    case 'build':
    default:
      break;
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          shippedProposals: true,
          modules: modules ? 'commonjs' : false,
          targets: {
            browsers: ['last 4 versions', 'not ie <= 8']
          }
        }
      ],
      ['@babel/preset-react', { development: dev }]
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      [
        '@babel/plugin-transform-runtime',
        { useESModules: !modules, corejs: 2 }
      ],
      'babel-plugin-dev-expression',
      modules && 'babel-plugin-add-module-exports',
      api.env() === 'test' && 'babel-plugin-istanbul'
    ].filter(Boolean)
  };
};
