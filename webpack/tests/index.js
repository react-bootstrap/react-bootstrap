/* eslint-env mocha */

import path from 'path';
import { inspect } from 'util';
import { spawn } from 'child-process-promise';

import buildConfCases from './buildConfSpec.js';
import testConfCases from './testConfSpec.js';
import docsConfCases from './docsConfSpec.js';

import { should } from 'chai';
should();

const webpackMock = path.join(__dirname, 'webpack-mock');

function runTests({ configFile, tests }) {
  describe('Webpack config', () => {
    tests.forEach((test) => {

      it(`should be equal to expected for "${configFile} ${test.args}"`, (done) => {
        spawn(webpackMock, [configFile, test.args], {capture: ['stdout', 'stderr']})
        .then(({ stdout }) => {
          inspect(test.expected, {depth: null}).should.equal(stdout.trim());
          done();
        })
        .fail(err => {
          done(err);
        });
      });

    });
  });
}

runTests(buildConfCases);
runTests(testConfCases);
runTests(docsConfCases);
