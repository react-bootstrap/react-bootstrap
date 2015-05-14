import { template } from 'lodash';
import path from 'path';
import fsp from 'fs-promise';
import { exec } from './exec';
import { srcRoot } from './constants';
import components from './public-components';

const templatePath = path.join(srcRoot, 'templates');
const factoryTemplatePath = path.join(templatePath, 'factory.js.template');
const indexTemplatePath = path.join(templatePath, 'factory.index.js.template');

export default function generateFactories(destination, babelOptions='') {

  let generateCompiledFile = function (file, content) {
    let outpath = path.join(destination, `${file}.js`);
    return exec(`babel ${babelOptions} --out-file ${outpath} <<EOF\n ${content}`);
  };

  return Promise.all([
    fsp.readFile(factoryTemplatePath)
      .then(templateString => {
        Promise.all(components.map(name => {
          generateCompiledFile(name, template(templateString)({name}));
        }));
      }),
    fsp.readFile(indexTemplatePath)
      .then(templateString => template(templateString)({components}))
      .then(content => generateCompiledFile('index', content))
  ]);

}
