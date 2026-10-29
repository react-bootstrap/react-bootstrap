export default (api) => {
  const env = api.env();

  let dev = false;
  let setUseClient = false;
  let modules;

  switch (env) {
    case 'docs':
    case 'test':
      dev = true;
      modules = false;
      break;
    // dist builds target production React, which has no jsxDEV
    case 'dist-dev':
    case 'dist-prod':
      modules = false;
      break;
    case 'esm':
      modules = false;
      setUseClient = true;
      break;
    case 'cjs':
    default:
      modules = 'commonjs';
      setUseClient = true;
      break;
  }

  return {
    presets: [
      [
        '@react-bootstrap',
        {
          dev,
          modules,
          removePropTypes: !dev,
          setUseClient,
          customClientImports: [
            'useBootstrapPrefix',
            'createWithBsPrefix',
            'useCol',
          ],
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [env === 'test' && 'istanbul'].filter(Boolean),
  };
};
