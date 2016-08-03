import metadata from 'react-component-metadata';
import glob from 'glob';
import fsp from 'fs-promise';
import promisify from '../tools/promisify';
import marked from 'marked';
import defaultDescriptions from './src/defaultPropDescriptions';

marked.setOptions({
  xhtml: true
});

let globp = promisify(glob);

// removes doclet syntax from comments
let cleanDoclets = desc => {
  let idx = desc.indexOf('@');
  return (idx === -1 ? desc : desc.substr(0, idx )).trim();
};

let cleanDocletValue = str => str.trim().replace(/^\{/, '').replace(/\}$/, '');

let quote = str => str && `'${str}'`;

let isLiteral = str => (/^('|")/).test(str.trim());

/**
 * parse out description doclets to an object and remove the comment
 *
 * @param  {ComponentMetadata|PropMetadata} obj
 */
function parseDoclets(obj, propName) {
  let desc = obj.desc || defaultDescriptions[propName] || '';
  obj.doclets = metadata.parseDoclets(desc) || {};
  obj.desc = cleanDoclets(desc);
  obj.descHtml = marked(obj.desc);
}

/**
 * Reads the JSDoc "doclets" and applies certain ones to the prop type data
 * This allows us to "fix" parsing errors, or unparsable data with JSDoc style comments
 *
 * @param  {Object} props     Object Hash of the prop metadata
 * @param  {String} propName
 */
function applyPropDoclets(props, propName) {
  let prop = props[propName];
  let doclets = prop.doclets;
  let value;

  // the @type doclet to provide a prop type
  // Also allows enums (oneOf) if string literals are provided
  // ex: @type {("optionA"|"optionB")}
  if (doclets.type) {
    value = cleanDocletValue(doclets.type);
    prop.type.name = value;

    if ( value[0] === '(' ) {
      value = value.substring(1, value.length - 1).split('|');

      prop.type.value = value;
      prop.type.name = value.every(isLiteral) ? 'enum' : 'union';
    }
  }

  // Use @required to mark a prop as required
  // useful for custom propTypes where there isn't a `.isRequired` addon
  if (doclets.required) {
    prop.required = true;
  }

  // Use @defaultValue to provide a prop's default value
  if (doclets.defaultValue) {
    prop.defaultValue = cleanDocletValue(doclets.defaultValue);
  }
}

function addBootstrapPropTypes(Component, componentData) {
  let propTypes = Component.propTypes || {};
  let defaultProps = Component.defaultProps || {};

  function bsPropInfo(propName) {
    let props = componentData.props;
    let prop = propTypes[propName];

    if (prop && !props[propName]) {
      let values = prop._values || [];

      props[propName] = {
        desc: '',
        defaultValue: quote(defaultProps[propName]),
        type: {
          name: 'enum',
          value: values.map( v => `"${v}"`),
        }
      };
    }
  }

  bsPropInfo('bsStyle');
  bsPropInfo('bsSize');

  if (propTypes.bsClass) {
    componentData.props.bsClass = {
      desc: '',
      defaultValue: quote(defaultProps.bsClass),
      type: { name: 'string' }
    };
  }
}

export default function generate(destination, options = { mixins: true, inferComponent: true }) {
  return globp(__dirname + '/../src/**/*.js') // eslint-disable-line no-path-concat
    .then( files => {
      let results = files.map(
        filename => fsp.readFile(filename, 'utf-8').then(content => metadata(content, options)));

      return Promise.all(results)
        .then( data => {
          let result = {};

          data.forEach(components => {
            Object.keys(components).forEach(key => {
              let Component;

              try {
                // require the actual component to inspect props we can only get a runtime
                Component = require('../src/' + key);
              } catch (e) {} //eslint-disable-line

              const component = components[key];

              if (Component) {
                addBootstrapPropTypes(Component, component);
              }

              parseDoclets(component);

              Object.keys(component.props).forEach( propName => {
                const prop = component.props[propName];

                parseDoclets(prop, propName);
                applyPropDoclets(component.props, propName);
              });
            });

            // combine all the component metadata into one large object
            result = { ...result, ...components };
          });

          return result;
        })
        .catch( e => setTimeout(()=> { throw e; }));
    });
}
