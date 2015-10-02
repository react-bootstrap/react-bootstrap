/* eslint no-console: 0 */

import React from 'react';
import path from 'path';
import Router from 'react-router';
import routes from './src/Routes';
import Root from './src/Root';
import fsp from 'fs-promise';
import { copy } from '../tools/fs-utils';
import { exec } from '../tools/exec';
import metadata from './generate-metadata';

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
function generateHTML(fileName, propData) {
  return new Promise( resolve => {
    const urlSlug = fileName === 'index.html' ? '/' : `/${fileName}`;

    Router.run(routes, urlSlug, Handler => {
      let html = React.renderToString(React.createElement(Handler, { propData }));
      html = '<!doctype html>' + html;
      let write = fsp.writeFile(path.join(docsBuilt, fileName), html);
      resolve(write);
    });
  });
}

export default function BuildDocs({dev}) {
  console.log('Building: '.cyan + 'docs'.green + (dev ? ' [DEV]'.grey : ''));

  const devOption = dev ? '' : '-p';

  return exec(`rimraf ${docsBuilt}`)
    .then(() => fsp.mkdir(docsBuilt))
    .then(metadata)
    .then(propData => {
      let pagesGenerators = Root.getPages().map( page => generateHTML(page, propData));

      return Promise.all(pagesGenerators.concat([
        exec(`webpack --config webpack.docs.js --bail ${devOption}`),
        copy(license, docsBuilt),
        copy(readmeSrc, readmeDest)
      ]));
    })
    .then(() => console.log('Built: '.cyan + 'docs'.green + (dev ? ' [DEV]'.grey : '')));
}
