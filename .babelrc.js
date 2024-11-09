module.exports = (api) => {
  const env = api.env();

  let dev = false;
  let setUseClient = false;
  let modules;

  switch (env) {
    case 'docs':
    case 'test':
    case 'dist-dev':
      dev = true;
      modules = false;
      break;
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
          customClientImports: ['useBootstrapPrefix', 'createWithBsPrefix'],
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [env === 'test' && 'istanbul'].filter(Boolean),
  };
};
