// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;

  let root = j(file.source);

  root
    .find(j.ImportDeclaration)
    .at(0)
    .insertBefore(
      j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier('withLayout'))],
        j.literal('../../withLayout')
      )
    );

  const mainExport = root.find(j.ExportDefaultDeclaration).get('declaration');

  if (
    mainExport.node.type !== 'CallExpression' ||
    mainExport.node.callee.name !== 'withLayout'
  ) {
    let node = mainExport.node;
    if (node.type === 'FunctionDeclaration')
      node = j.functionExpression(
        node.id,
        node.params,
        node.body,
        node.generator,
        node.expression
      );

    mainExport.replace(j.callExpression(j.identifier('withLayout'), [node]));
  }

  return root.toSource();
}
