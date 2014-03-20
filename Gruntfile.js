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
      }
    },

    clean: {
      transpiled: ['transpiled'],
      cjs: ['cjs'],
      amd: ['amd'],
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
      }
    },

    requirejs: {
        dev: {
            // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
            options: {
                "baseUrl": "tools",
                "paths": {
                    "react-bootstrap": "../amd"
                },
                "include": ["almond", "react-bootstrap"],
                "exclude": ["react"],
                "out": "dist/react-bootstrap.js",
                "wrap": {
                    "startFile": "tools/wrap.start",
                    "endFile": "tools/wrap.end"
                },
                "optimize": "none",
                "generateSourceMaps": true
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

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');
  grunt.loadNpmTasks('grunt-es6-module-wrap-default');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('build', [
    'clean:amd',
    'clean:cjs',
    'clean:test',
    'react:src',
    'react:test',
    'transpile',
    'es6_module_wrap_default',
    'copy:amdreact',
    'browserify:test',
    'requirejs:dev',
    'uglify:build',
    'clean:transpiled'
  ]);

  grunt.registerTask('default', ['build']);

};
