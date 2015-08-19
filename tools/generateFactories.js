import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import { srcRoot } from './constants';
import components from './public-components';
import { buildContent } from './buildBabel';

export default function generateFactories(destination, babelOptions = {}) {

  function generateCompiledFile(file, content) {
    const outpath = path.join(destination, 'factories', `${file}.js`);
    buildContent(content, __dirname, outpath, babelOptions);
  }

  const indexTemplate = fs.readFileSync(path.join(srcRoot, 'templates', 'factory.index.js.template'));
  const factoryTemplate = fs.readFileSync(path.join(srcRoot, 'templates', 'factory.js.template'));

  generateCompiledFile( 'index', _.template(indexTemplate)({components}) );

  return Promise.all(
    components.map( name => generateCompiledFile( name, _.template(factoryTemplate)({name}) ))
  );
}
