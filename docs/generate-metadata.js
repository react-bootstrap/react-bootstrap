import metadata from 'react-component-metadata';
import glob from 'glob';
import fsp from 'fs-promise';
import promisify from '../tools/promisify';

let globp = promisify(glob);

// removes doclet syntax from comments
let cleanDoclets = desc => {
  let idx = desc.indexOf('@');
  return (idx === -1 ? desc : desc.substr(0, idx )).trim();
};

let cleanDocletValue = str => str.trim().replace(/^\{/, '').replace(/\}$/, '');

let isLiteral = str => str.trim()[0] === '"' || str.trim()[0] === "'";

/**
 * parse out description doclets to an object and remove the comment
 *
 * @param  {ComponentMetadata|PropMetadata} obj
 */
function parseDoclets(obj){
  obj.doclets = metadata.parseDoclets(obj.desc || '') || {};
  obj.desc = cleanDoclets(obj.desc || '');
}

/**
 * Reads the JSDoc "doclets" and applies certain ones to the prop type data
 * This allows us to "fix" parsing errors, or unparsable data with JSDoc style comments
 *
 * @param  {Object} props     Object Hash of the prop metadata
 * @param  {String} propName
 */
function applyPropDoclets(props, propName){
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
  if ( doclets.required) {
    prop.required = true;
  }
}


export default function generate(destination, options = { mixins: true }){

  return globp(__dirname + '/../src/**/*.js') //eslint-disable-line no-path-concat
    .then( files => {

      let results = files.map(
        filename => fsp.readFile(filename).then(content => metadata(content, options)) );

      return Promise.all(results)
        .then( data => {
          let result = {};

          data.forEach(components => {
            Object.keys(components).forEach(key => {
              const component = components[key];

              parseDoclets(component);

              Object.keys(component.props).forEach( propName => {
                const prop = component.props[propName];

                parseDoclets(prop);
                applyPropDoclets(component.props, propName);
              });
            });

            //combine all the component metadata into one large object
            result = { ...result, ...components };
          });

          return result;
        })
        .catch( e => setTimeout(()=> { throw e; }));
    });
}
