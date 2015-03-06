import _ from 'lodash';
import path from 'path';
import fsp from 'fs-promise';
import { exec, spawn } from 'child-process-promise';

const repoRoot = path.resolve(__dirname, '../../');
const amd = path.join(repoRoot, 'amd');
const src = path.join(repoRoot, 'src');

const packagePath = path.join(repoRoot, 'package.json');
const bowerTemplate = path.join(__dirname, 'bower.json');
const bowerDestination = path.join(amd, 'bower.json');

const readme = path.join(__dirname, 'README.md');
const license = path.join(repoRoot, 'LICENSE');

function bowerConfig() {
  return Promise.all([
    fsp.readFile(packagePath)
      .then(json => JSON.parse(json)),
    fsp.readFile(bowerTemplate)
      .then(template => _.template(template))
  ])
  .then(([pkg, template]) => template({ pkg }))
  .then(config => fsp.writeFile(bowerDestination, config));
}

export default function BuildBower() {
  console.log('Building: '.cyan + 'bower module'.green);

  return exec(`rm -rf ${amd}`)
    .then(() => fsp.mkdir(amd))
    .then(() => Promise.all([
      bowerConfig(),
      exec(`babel --modules amd --optional es7.objectRestSpread ${src} --out-dir ${path.join(amd, 'lib')}`),
      exec(`cp ${readme} ${amd}`),
      exec(`cp ${license} ${amd}`)
    ]))
    .then(() => console.log('Built: '.cyan + 'bower module'.green));
}
