import { transform } from 'babel-core';
import resolveRc from 'babel-core/lib/babel/tools/resolve-rc';
import * as babelUtil from 'babel-core/lib/babel/util';
import glob from 'glob';
import fs from 'fs';
import path from 'path';
import outputFileSync from 'output-file-sync';

export function buildContent(content, filename, destination, babelOptions={}) {
  const result = transform(content, resolveRc(filename, babelOptions));
  outputFileSync(destination, result.code, {encoding: 'utf8'});
}

export function buildFile(filename, destination, babelOptions={}) {
  let content = fs.readFileSync(filename, {encoding: 'utf8'});
  if (babelOptions.__reactBootstrapDeprecationWarning) {
    content = `console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');
${content}`;
  }

  if(babelUtil.canCompile(filename)) {
    // Get file basename without the extension (in case not .js)
    let outputName = path.basename(filename, path.extname(filename));
    // append the file basename with extension .js
    let outputPath = path.join(destination, outputName + '.js');
    // console.log('%s => %s', filename, outputPath);
    buildContent(content, filename, outputPath, babelOptions);
  }
}

export function buildFolder(folderPath, destination, babelOptions={}, firstFolder=true) {
  let stats = fs.statSync(folderPath);

  if(stats.isFile()) {
    buildFile(folderPath, destination, babelOptions);
  } else if(stats.isDirectory()) {
    let outputPath = firstFolder ? destination : path.join(destination, path.basename(folderPath));
    let files = fs.readdirSync(folderPath).map(file => path.join(folderPath, file));
    files.forEach(filename => buildFolder(filename, outputPath, babelOptions, false));
  }
}

export function buildGlob(filesGlob, destination, babelOptions={}) {
  let files = glob.sync(filesGlob);
  if (!files.length) {
    files = [filesGlob];
  }
  files.forEach(filename => buildFolder(filename, destination, babelOptions, true));
}

