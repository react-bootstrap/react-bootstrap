const { runInNewContext } = require('vm');

const srcCache = new Map();
exports.requireInNewContext = function requireInNewContext(filename) {
  const root = {
    process,
    component: srcCache.get(filename),
    require: Object.assign(require, {
      extensions: Object.assign({}, require.extensions),
    }),
  };
  runInNewContext(`
    require('babel-register')();
    component = component || require('${filename}');
  `, root);

  srcCache.set(filename, root.component);
  return root.component;
};

let quote = str => str && `'${str}'`;


exports.addBootstrapPropTypes = function addBootstrapPropTypes(doc, Component) {
  let propTypes = Component.propTypes || {};
  let defaultProps = Component.defaultProps || {};

  function bsPropInfo(propName) {
    let prop = propTypes[propName];
    let desc = prop && doc.getPropDescriptor(propName);

    if (desc && !Object.keys(desc).length) {
      let values = prop._values || [];
      Object.assign(desc, {
        required: false,
        description: '',
        defaultValue: { value: quote(defaultProps[propName]) },
        type: {
          name: 'enum',
          value: values.map(v => ({ value: `"${v}"` })),
        },
      });
    }
  }

  bsPropInfo('bsStyle');
  bsPropInfo('bsSize');

  if (propTypes.bsClass) {
    const bsClass = doc.getPropDescriptor('bsClass');
    Object.assign(bsClass, {
      required: false,
      description: '',
      type: { name: 'string' },
      defaultValue: { value: quote(defaultProps.bsClass) },
    });
  }
};
