// This ensures we only load a single copy of React from the Docusaurus node_modules
// directory. Without this, importing aliased modules from another directory with React
// installed would result in the "Invalid Hooks" error due to multiple copies of React
// being used.
module.exports = () => ({
  name: 'react-resolver-plugin',
  configureWebpack() {
    return {
      resolve: {
        alias: {
          react$: require.resolve('react'),
          'react/jsx-runtime': require.resolve('react/jsx-runtime'),
          'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime'),
          'react-dom$': require.resolve('react-dom'),
          'react-dom/server': require.resolve('react-dom/server'),
        },
      },
    };
  },
});
