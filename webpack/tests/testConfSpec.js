export default {
  configFile: 'webpack/test.config.js',
  tests: [
    // npm run test
    {
      args: '',
      expected: {
        entry: undefined,
        output: { pathinfo: true },
        externals: undefined,
        module: { loaders: [ { test: /\.js/, loader: 'babel', exclude: /node_modules/ } ] },
        plugins: [ { definitions: { 'process.env': { NODE_ENV: '"development"' } } } ],
        devtool: 'eval'
      }
    }
  ]
};
