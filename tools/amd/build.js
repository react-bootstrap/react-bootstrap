import _ from 'lodash';
import path from 'path';
import fsp from 'fs-promise';
import { copy } from '../fs-utils';
import { exec } from '../exec';
import generateFactories from '../generateFactories';
import { repoRoot, srcRoot, bowerRoot } from '../constants';

const packagePath = path.join(repoRoot, 'package.json');
const bowerTemplate = path.join(__dirname, 'bower.json');
const bowerJson = path.join(bowerRoot, 'bower.json');

const readme = path.join(__dirname, 'README.md');
const license = path.join(repoRoot, 'LICENSE');

const babelOptions = '--modules amd';

const libDestination = path.join(bowerRoot, 'lib');
const factoriesDestination = path.join(libDestination, 'factories');

function bowerConfig() {
  return Promise.all([
    fsp.readFile(packagePath)
      .then(json => JSON.parse(json)),
    fsp.readFile(bowerTemplate)
      .then(template => _.template(template))
  ])
  .then(([pkg, template]) => template({ pkg }))
  .then(config => fsp.writeFile(bowerJson, config));
}

export default function BuildBower() {
  console.log('Building: '.cyan + 'bower module'.green);

  return exec(`rimraf ${bowerRoot}`)
    .then(() => fsp.mkdirs(factoriesDestination))
    .then(() => Promise.all([
      bowerConfig(),
      generateFactories(factoriesDestination, babelOptions),
      exec(`babel ${babelOptions} ${srcRoot} --out-dir ${libDestination}`),
      copy(readme, bowerRoot),
      copy(license, bowerRoot)
    ]))
    .then(() => console.log('Built: '.cyan + 'bower module'.green));
}
