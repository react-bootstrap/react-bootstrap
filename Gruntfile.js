module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    transpile: {
      cjs: {
        type: 'cjs',
        files: [{
          expand: true,
          cwd: '.',
          src: ['transpiled/**/*.js'],
          dest: 'cjs/'
        }]
      },
      amd: {
        type: 'amd',
        anonymous: true,
        files: [{
          expand: true,
          cwd: '.',
          src: ['transpiled/**/*.js'],
          dest: 'amd/'
        }]
      }
    },

    es6_module_wrap_default: {
      cjs: {
        options: {
          type: 'cjs'
        },
        files: [{
          expand: true,
          cwd: 'cjs/transpiled',
          src: ['*.js'],
          dest: 'cjs'
        }]
      },
      amd: {
        options: {
          type: 'amd'
        },
        files: [{
          expand: true,
          cwd: 'amd/transpiled',
          src: ['*.js'],
          dest: 'amd'
        }]
      }
    },

    copy: {
      amdreact: {
        files: [
          {
            src: ['tools/react-es6.js'],
            dest: 'amd/transpiled/react-es6.js'
          }
        ]
      }
    },

    react: {
      src: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/*.*'],
            dest: 'transpiled',
            ext: '.js'
          }
        ]
      },
      test: {
        files: [
          {
            expand: true,
            cwd: 'test',
            src: ['**/*.*'],
            dest: 'test-built',
            ext: '.js'
          }
        ]
      },
      docs: {
        files: [
          {
            expand: true,
            cwd: 'docs/src',
            src: ['**/*.*'],
            dest: 'docs/built',
            ext: '.js'
          }
        ]
      }
    },

    clean: {
      transpiled: ['transpiled'],
      cjs: ['cjs'],
      amd: ['amd'],
      docs: ['docs/build'],
      test: ['test-built']
    },

    watch: {
      all: {
        files: [
          'src/**/*.jsx',
          'src/**/*.js',
          'test/**/*.jsx',
          'test/**/*.js'
        ],
        tasks: ['build'],
        options: {
          spawn: false
        }
      },
      docs: {
        files: [
          'docs/src/**/*.js',
          'docs/examples/**/*.js'
        ],
        tasks: ['build:docs'],
        options: {
          spawn: false
        }
      }
    },

    browserify: {
      test: {
        files: {
          'test_bundle.js': ['test-built/**/*.js']
        },
        options: {
          transform: ['envify'],
          verbose: true
        }
      },
      docs: {
        files: {
          'docs/bundle.js': ['docs/index.js']
        },
        options: {
          transform: ['envify', 'brfs']
        }
      }
    },

    // TODO: work out how to get grunt-contrib-requirejs working
    shell: {
      requirejs: {
        command: 'node tools/r.js -o tools/build.js',
        options: {
            stdout: true
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }

  });

  function clearNodeRequireCacheForTree (tree) {
    if (tree.children) {
      tree.children
        .forEach(function (childTree) {
          clearNodeRequireCacheForTree(childTree);
        });
    }

    delete require.cache[tree.id];
  }

  grunt.registerTask('generateDocsHTML', 'Generate HTML from React for the docs website', function () {
    var React = require('react');
    var componentPath = __dirname + '/docs/built/Root.js';

    // Clear Node's require cache so we get a fresh version of
    // this component and it's dependencies. This is particularly
    // useful when using the grunt watch task with runs each time
    // within the same node context.
    if (require.cache[componentPath]) {
      clearNodeRequireCacheForTree(require.cache[componentPath]);
    }

    var Root = require(componentPath);

    Root.getPages()
      .forEach(function (fileName) {
        var RootHTML = React.renderComponentToString(Root({initialPath: fileName}));

        grunt.file.write('./docs/' + fileName, Root.getDoctype() + RootHTML);
        grunt.log.writeln('Generated ' +
          ('Root({initialPath: "' + fileName + '"})').cyan +
          ' --> ' +
          ('docs/' + fileName).cyan);
      });

    grunt.verbose.ok();
  });

  grunt.registerTask('serveDocs', 'Serve the docs website', function () {
    var http = require('http');
    var send = require('send');

    var done = this.async();

    http.createServer(function (req, res){
      function error(err) {
        res.statusCode = err.status || 500;
        var errMessage = res.statusCode + ': ' + err.message;
        res.end(errMessage);
        grunt.log.errorlns(errMessage);
      }

      var url = req.url;
      grunt.verbose.writeln(url);
      send(req, url)
        .root('docs')
        .on('error', error)
        .pipe(res);
    }).listen(4000);

    grunt.log.writeln('Docs running at ' +
      'http://localhost:4000/'.cyan );
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');
  grunt.loadNpmTasks('grunt-es6-module-wrap-default');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', [
    'clean:amd',
    'clean:cjs',
    'clean:docs',
    'clean:test',
    'react:src',
    'react:test',
    'transpile',
    'es6_module_wrap_default',
    'copy:amdreact',
    'browserify:test',
    'shell:requirejs',
    'uglify:build',
    'clean:transpiled'
  ]);

  grunt.registerTask('build:docs', [
    'clean:docs',
    'react:docs',
    'browserify:docs',
    'generateDocsHTML'
  ]);

  grunt.registerTask('default', ['build']);

};
