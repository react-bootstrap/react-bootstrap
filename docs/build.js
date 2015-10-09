/* eslint no-console: 0 */

import fsp from 'fs-promise';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {match, RoutingContext} from 'react-router';

import Root from './src/Root';
import routes from './src/Routes';

import metadata from './generate-metadata';

import {copy} from '../tools/fs-utils';
import {exec} from '../tools/exec';

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
  return new Promise( resolve => {
    const location = fileName === 'index.html' ? '/' : `/${fileName}`;
    match({routes, location}, (error, redirectLocation, renderProps) => {
      let html = ReactDOMServer.renderToString(
        <RoutingContext {...renderProps} />
      );
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
      Root.assetBaseUrl = '';
      Root.propData = propData;

      const pagesGenerators = Root.getPages().map(generateHTML);

      return Promise.all(pagesGenerators.concat([
        exec(`webpack --config webpack.docs.js --bail ${devOption}`),
        copy(license, docsBuilt),
        copy(readmeSrc, readmeDest)
      ]));
    })
    .then(() => console.log('Built: '.cyan + 'docs'.green + (dev ? ' [DEV]'.grey : '')));
}
