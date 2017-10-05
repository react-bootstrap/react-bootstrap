const { transform } = require('babel-core');
const fse = require('fs-extra');
const path = require('path');


async function buildFile(filename, destination, babelOptions = {}) {
  if (!path.extname(filename) === '.js') return;

  const content = await fse.readFile(filename, { encoding: 'utf8' });

  babelOptions.filename = filename;

  const result = transform(content, babelOptions);
  const output = path.join(destination, path.basename(filename));

  // console.log(`${filename} -> ${output}`);
  await fse.outputFile(output, result.code);
}

async function _build(folderPath, destination, babelOptions = {}, firstFolder = true) {
  let stats = fse.statSync(folderPath);

  if (stats.isFile()) {
    await buildFile(folderPath, destination, babelOptions);
  } else if (stats.isDirectory()) {
    let outputPath = firstFolder ? destination : path.join(destination, path.basename(folderPath));

    let files = (await fse
      .readdir(folderPath))
      .map(file => path.join(folderPath, file));

    await Promise.all(
      files.map(f => _build(f, outputPath, babelOptions, false)),
    );
  }
}

module.exports = function buildBabel(folderPath, destination, babelOptions = {}) {
  return _build(folderPath, destination, babelOptions);
};
