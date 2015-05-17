import React from 'react';
import path from 'path';
import Router from 'react-router';
import routes from './src/Routes';
import Root from './src/Root';
import fsp from 'fs-promise';
import { copy } from '../tools/fs-utils';
import { exec } from '../tools/exec';

const repoRoot = path.resolve(__dirname, '../');
const docsBuilt = path.join(repoRoot, 'docs-built');

const license = path.join(repoRoot, 'LICENSE');
const readmeSrc = path.join(__dirname, 'README.docs.md');
const readmeDest = path.join(docsBuilt, 'README.md');

/**
 * Generates HTML code for `fileName` page.
 *
 * @param {string} fileName Path for Router.Route
 * @return {Promise} promise
 * @internal
 */
function generateHTML(fileName) {
  return new Promise((resolve, reject) => {
    Router.run(routes, '/' + fileName, Handler => {
      let html = React.renderToString(React.createElement(Handler));
      html = '<!doctype html>' + html;
      let write = fsp.writeFile(path.join(docsBuilt, fileName), html);
      resolve(write);
    });
  });
}

export default function BuildDocs({ dev }) {
  console.log('Building: '.cyan + 'docs'.green + (dev ? ' [DEV]'.grey : ''));

  return exec(`rimraf ${docsBuilt}`)
    .then(() => fsp.mkdir(docsBuilt))
    .then(() => {
      let pagesGenerators = Root.getPages().map(generateHTML);

      return Promise.all(pagesGenerators.concat([
        exec(`webpack --config webpack.docs.js ${dev ? '' : '-p '}--bail`),
        copy(license, docsBuilt),
        copy(readmeSrc, readmeDest)
      ]));
    })
    .then(() => console.log('Built: '.cyan + 'docs'.green + (dev ? ' [DEV]'.grey : '')));
}
