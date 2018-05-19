module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        shippedProposals: true,
        modules: false,
        targets: {
          browsers: ['last 4 versions', 'not ie <= 8']
        }
      }
    ],
    [
      '@babel/preset-react',
      { development: process.env.NODE_ENV === 'development' }
    ]
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    ['@babel/plugin-transform-runtime', { useESModules: true }],
    'babel-plugin-dev-expression'
  ]
};
