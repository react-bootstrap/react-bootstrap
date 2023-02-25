const camelCase = require('lodash.camelcase');
const { resolver, utils } = require('react-docgen');
const { namedTypes: types, visit } = require('ast-types');
const buildParser = require('react-docgen/dist/babelParser').default;

const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);

const parser = buildParser({
  // Avoid babel complaining about requiring a filename.
  filename: 'dummy.ts',
});

module.exports = (ast) => {
  let components = resolver.findAllComponentDefinitions(ast);

  const getComment = (path) => {
    let searchPath = path;
    while (searchPath && !types.Statement.check(searchPath.node)) {
      searchPath = searchPath.parent;
    }
    let comment =
      (searchPath &&
        searchPath.node.leadingComments &&
        searchPath.node.leadingComments.map((c) => c.value).pop()) ||
      null;

    if (comment) comment = `/${comment}*/`;
    return comment;
  };

  visit(ast, {
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
        optionsNode.properties.find((p) => p.key.name === 'Component');

      if (property) {
        type =
          property.value.type === 'Identifier'
            ? property.value.name
            : property.value.raw;
      }

      const src = `
import * as React from 'react';
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
        `;

      let comp = parser.parse(src);
      comp.__src = src;
      components = components.concat(
        resolver.findExportedComponentDefinition(comp),
      );
      return false;
    },
  });

  return components;
};
