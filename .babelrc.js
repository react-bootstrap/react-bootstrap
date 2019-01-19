module.exports = api => {
  let dev = false;
  let modules = 'commonjs';

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
    presets: [['@react-bootstrap', { dev, modules, removePropTypes: !dev }]],
  };
};
