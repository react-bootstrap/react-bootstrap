import React from 'react';
import path from 'path';
import Router from 'react-router';
import routes from './src/Routes';
import Root from './src/Root';
import fsp from 'fs-promise';
import { copy } from '../tools/fs-utils';
import { exec, spawn } from 'child-process-promise';

const repoRoot = path.resolve(__dirname, '../');
const docsBuilt = path.join(repoRoot, 'docs-built');

const license = path.join(repoRoot, 'LICENSE');
const readmeSrc = path.join(__dirname, 'README.docs.md');
const readmeDest = path.join(docsBuilt, 'README.md');

export default function BuildDocs() {
  console.log('Building: '.cyan + 'docs'.green);

  return exec(`rimraf ${docsBuilt}`)
    .then(() => fsp.mkdir(docsBuilt))
    .then(() => {
      let writes = Root
        .getPages()
        .map(fileName => new Promise((resolve, reject) => {
          Router.run(routes, '/' + fileName, Handler => {
            let RootHTML = React.renderToString(React.createElement(Handler));
            let write = fsp.writeFile(path.join(docsBuilt, fileName), RootHTML);
            resolve(write);
          });
        }));

      return Promise.all(writes.concat([
        exec(`webpack --config webpack.docs.js -p --bail`),
        copy(license, docsBuilt),
        copy(readmeSrc, readmeDest)
      ]));
    })
    .then(() => console.log('Built: '.cyan + 'docs'.green));
}
