const { camelCase, upperFirst } = require('lodash');
const { resolver, utils } = require('react-docgen');
const buildParser = require('react-docgen/dist/babelParser').default;

const parser = buildParser();

module.exports = (ast, recast) => {
  const {
    types: { namedTypes: types },
  } = recast;

  let components = resolver.findAllComponentDefinitions(ast, recast);

  const getComment = path => {
    let searchPath = path;
    while (searchPath && !types.Statement.check(searchPath.node)) {
      searchPath = searchPath.parent;
    }
    let comment =
      (searchPath &&
        searchPath.node.leadingComments &&
        searchPath.node.leadingComments.map(c => c.value).pop()) ||
      null;

    if (comment) comment = `/${comment}*/`;
    return comment;
  };

  recast.visit(ast, {
    visitCallExpression(path) {
      if (types.ExpressionStatement.check(path.node)) {
        path = path.get('expression');
      }
      if (path.node.type !== 'CallExpression') return false;

      const module = utils.resolveToModule(path);

      if (!module || !module.endsWith('createWithBsPrefix')) return false;
      const [prefixNode, optionsNode] = path.node.arguments;

      const comment = getComment(path);
      let type = '"div"';

      const property =
        optionsNode &&
        optionsNode.properties.find(p => p.key.name === 'Component');

      if (property) {
        type =
          property.value.type === 'Identifier'
            ? property.value.name
            : property.value.raw;
      }

      let comp = recast.parse(
        `
import React from 'react';
import PropTypes from 'prop-types';

${comment || ''}
export default class ${upperFirst(
          camelCase(prefixNode.value),
        )} extends React.Component {
  static propTypes = {
    /** @default ${prefixNode.raw} */
    bsPrefix: PropTypes.string.isRequired,
    as: PropTypes.elementType,
  }
  static defaultProps = {
    as: ${type}
  }
  render() {
    return null
  }
}
        `,
        { esprima: parser },
      );
      components = components.concat(
        resolver.findExportedComponentDefinition(comp.program, recast),
      );
      return false;
    },
  });

  return components;
};
