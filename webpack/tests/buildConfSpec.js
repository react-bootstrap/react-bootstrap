export default {
  configFile: 'webpack.config.js',
  tests: [
    // npm run build | `webpack --bail`
    {
      args: '',
      expected: {
        entry: { 'react-bootstrap': './src/index.js' },
        output:
         { path: './dist',
           filename: '[name].js',
           library: 'ReactBootstrap',
           libraryTarget: 'umd' },
        externals:
         [ { react:
              { root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react' } } ],
        module: { loaders: [ { test: /\.js/, loader: 'babel', exclude: /node_modules/ } ] },
        plugins: [ { definitions: { 'process.env': { NODE_ENV: '"development"' } } } ]
      }
    },

    // npm run build | `webpack --bail -p`
    {
      args: 'p',
      expected: {
        entry: { 'react-bootstrap': './src/index.js' },
        output:
         { path: './dist',
           filename: '[name].min.js',
           library: 'ReactBootstrap',
           libraryTarget: 'umd' },
        externals:
         [ { react:
              { root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react' } } ],
        module: { loaders: [ { test: /\.js/, loader: 'babel', exclude: /node_modules/ } ] },
        plugins: [ { definitions: { 'process.env': { NODE_ENV: '"production"' } } } ],
        devtool: 'source-map'
      }
    }
  ]
};
