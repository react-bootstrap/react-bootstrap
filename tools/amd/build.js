import fsp from 'fs-promise';
import template from 'lodash/template';
import path from 'path';

import { repoRoot, bowerRoot } from '../constants';
import { exec } from '../exec';
import { copy } from '../fs-utils';

const packagePath = path.join(repoRoot, 'package.json');
const bowerTemplatePath = path.join(__dirname, 'bower.json');
const bowerJson = path.join(bowerRoot, 'bower.json');

const readme = path.join(__dirname, 'README.md');

function bowerConfig() {
  return Promise.all([
    fsp.readFile(packagePath)
      .then(json => JSON.parse(json)),
    fsp.readFile(bowerTemplatePath)
      .then(templateString => template(templateString))
  ])
  .then(([pkg, compiledTemplate]) => compiledTemplate({ pkg }))
  .then(config => fsp.writeFile(bowerJson, config));
}

export default function BuildBower() {
  console.log('Building: '.cyan + 'bower module'.green);

  return exec(`rimraf ${bowerRoot}`)
    .then(() => fsp.mkdirs(bowerRoot))
    .then(() => Promise.all([
      bowerConfig(),
      copy(readme, bowerRoot)
    ]))
    .then(() => console.log('Built: '.cyan + 'bower module'.green));
}
