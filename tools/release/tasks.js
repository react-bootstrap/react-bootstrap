var fs = require('fs');
var async = require('async');
var childProcess = require('child_process');
var path = require('path');
var semver = require('semver');
var execSeries = require('./exec-series.js');
var spawnCommand = require('./spawn-command.js');

module.exports = function(grunt) {
  grunt.registerTask('release', function(type) {
    var complete = this.async();

    var filesToCopy = grunt.config.get('release-component.options.copy');
    var bowerRepo = 'git@github.com:react-bootstrap/react-bootstrap-bower.git';
    var docsRepo = 'git@github.com:react-bootstrap/react-bootstrap.github.io.git';

    // Grunt is kind enough to change cwd to the directory the Gruntfile is in
    // but double check just in case
    var repoRoot = process.cwd();
    var libRoot = path.join(repoRoot, 'lib/');
    var bowerRoot = path.join(repoRoot, 'amd/');
    var docsRoot = path.join(repoRoot, 'docs/');
    var tmpBowerRepo = path.join(repoRoot, 'tmp-bower-repo');
    var tmpDocsRepo = path.join(repoRoot, 'tmp-docs-repo');

    var version;

    async.series([
      // Ensure git repo is actually ready to release
      ensureClean,
      ensureFetched,

      // Clean build output
      function(next) {
        execSeries([
          ['rm', ['-rf', bowerRoot]],
          ['rm', ['-rf', libRoot]],
        ], next);
      },

      // Bump versions
      function(next) {
        modifyJSONSync(path.join(repoRoot, 'package.json'), function(packageJSON) {
          var oldVersion = packageJSON.version;
          if (!type) {
            type = 'patch';
          }
          if (['major', 'minor', 'patch'].indexOf(type) === -1) {
            version = type;
          } else {
            version = semver.inc(packageJSON.version, type || 'patch');
          }
          console.log('version changed from ' + oldVersion + ' to ' + version);
          packageJSON.version = version;
        });
        next();
      },

      // Generate Changelog
      function(next) {
        execSeries([
          ['node_modules/.bin/changelog', ['-t', 'v' + version]],
          ['git', ['add', path.join(repoRoot, 'CHANGELOG.md')]],
        ], next);
      },

      // Add and commit
      function(next) {
        execSeries([
          ['git', ['add', path.join(repoRoot, 'package.json')]],
          ['git', ['commit', '-m', '"Release v' + version + '"']]
        ], next);
      },

      // Build src
      function(next) {
        execSeries([
          ['grunt', ['build']]
        ], next);
      },

      // Build docs
      function(next) {
        execSeries([
          ['rm', ['-rf', path.join(docsRoot, 'node_modules')]],
          ['git', ['clean', '-dfx']],
          ['npm', ['install']],
          ['npm', ['run', 'build']]
        ], next, {
          cwd: docsRoot
        });
      },

      // Tag
      function(next) {
        tag('v' + version, next);
      },

      // Push
      function(next) {
        execSeries([
          ['git', ['push']],
          ['git', ['push', '--tags']]
        ], next);
      },

      // Publish to npm
      function(next) {
        execSeries([
          ['npm', ['publish']]
        ], next);
      },

      function(next) {
        ReleaseRepo(bowerRepo, bowerRoot, tmpBowerRepo, version, next);
      },

      function(next) {
        ReleaseRepo(docsRepo, docsRoot, tmpDocsRepo, version, next);
      }

    ], complete);
  });
};

function ReleaseRepo(repo, srcFolder, tmpFolder, version, callback) {
  async.series([
    // Clone repo into tmpFolder and copy built files into it
    function(next) {
      var commands = [
        ['rm',  ['-rf', tmpFolder]],
        ['git', ['clone', repo, tmpFolder]]
      ];
      execSeries(commands, function() {
        var additionalCommands = fs.readdirSync(tmpFolder)
          .filter(function(f) { return f !== '.git'; })
          .map(function(f) { return ['rm', ['-rf', path.join(tmpFolder, f)]] });

        additionalCommands.push(['cp',  ['-R', srcFolder, tmpFolder]]);
        additionalCommands.push(['mv',  [path.join(tmpFolder, '.gitignore-template'), path.join(tmpFolder, '.gitignore')]]);

        execSeries(additionalCommands, next)
      });
    },

    // Add and commit in repo
    function(next) {
      var commands = [
        ['git', ['add', '-A', '.']],
        ['git', ['commit', '-m', '"Release v' + version + '"']]
      ];
      execSeries(commands, next, {
        cwd: tmpFolder
      });
    },

    // Tag in repo
    function(next) {
      tag('v' + version, next, {
        cwd: tmpFolder
      });
    },

    // Push in repo
    function(next) {
      execSeries([
        ['git', ['push']],
        ['git', ['push', '--tags']]
      ], next, {
        cwd: tmpFolder
      });
    },

    // Delete repo
    function(next) {
      execSeries([
        ['rm', ['-rf', tmpFolder]]
      ], next);
    }
  ], callback);
}

function ensureClean(callback) {
  childProcess.exec('git diff-index --name-only HEAD --', function(err, stdout, stderr) {
    if (err) {
      throw err;
    }

    if (stdout.length) {
      throw new Error('Git repository must be clean');
    } else {
      callback();
    }
  });
}

function tag(name, callback, options) {
  spawnCommand('git', ['tag', '-a', '--message=' + name, name], options)
      .on('error', function(err) {
        throw err;
      })
      .on('exit', function(code) {
        if (code) {
          throw new Error('Failed tagging ' + name + ' code: ' + code);
        } else {
          callback();
        }
      });
}

function ensureFetched(callback) {
  childProcess.exec('git fetch', function(err, stdout, stderr) {
    if (err) {
      throw err;
    }

    childProcess.exec('git branch -v --no-color | grep -e "^\\*"', function(err, stdout, stderr) {
      if (err) {
        throw err;
      }

      if (/\[behind (.*)\]/.test(stdout)) {
        throw new Error('Your repo is behind by ' + RegExp.$1 + ' commits');
      }

      callback();
    });
  });
}

function modifyJSONSync(JSONPath, callback) {
  var json = JSON.parse(fs.readFileSync(JSONPath).toString());
  callback(json);
  fs.writeFileSync(JSONPath, JSON.stringify(json, null, 2));
}
