module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    transpile: {
      npm: {
        type: 'cjs',
        files: [{
          expand: true,
          cwd: '.',
          src: ['transpiled/**/*.js'],
          dest: 'react-bootstrap-npm/'
        }]
      },
      bower: {
        type: 'amd',
        anonymous: true,
        files: [{
          expand: true,
          cwd: '.',
          src: ['transpiled/**/*.js'],
          dest: 'react-bootstrap-bower/'
        }]
      }
    },

    es6_module_wrap_default: {
      npm: {
        options: {
          type: 'cjs'
        },
        files: [{
          expand: true,
          cwd: 'react-bootstrap-npm/transpiled',
          src: ['*.js'],
          dest: 'react-bootstrap-npm'
        }]
      },
      bower: {
        options: {
          type: 'amd'
        },
        files: [{
          expand: true,
          cwd: 'react-bootstrap-bower/transpiled',
          src: ['*.js'],
          dest: 'react-bootstrap-bower'
        }]
      }
    },

    copy: {
      bower: {
        files: [
          {
            dot: true,
            expand: true,
            cwd: 'tools/bower/',
            src: ['**'],
            dest: 'react-bootstrap-bower/'
          }
        ]
      },
      npm: {
        files: [
          {
            dot: true,
            expand: true,
            cwd: 'tools/npm/',
            src: ['**'],
            dest: 'react-bootstrap-npm/'
          }
        ]
      },
      options: {
        process: function (content, srcpath) {
          return grunt.template.process(content);
        }
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
      npm: ['react-bootstrap-npm'],
      bower: ['react-bootstrap-bower']
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
          spawn: false,
        },
      },
    },

    browserify: {
      test: {
        files: {
          'test_bundle.js': ['test-built/**/*.js'],
        },
        options: {
          transform: ['envify'],
          verbose: true
        }
      }
    },

    // TODO: work out how to get grunt-contrib-requirejs working
    shell: {
      requirejs: {
        command: 'node tools/vendor/r.js -o tools/build.js',
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
        src: 'react-bootstrap-bower/<%= pkg.name %>.js',
        dest: 'react-bootstrap-bower/<%= pkg.name %>.min.js'
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
  grunt.loadNpmTasks('grunt-es6-module-wrap-default');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', [
    'clean:bower',
    'clean:npm',
    'react',
    'transpile',
    'es6_module_wrap_default',
    'copy:bower',
    'copy:npm',
    'browserify',
    'shell:requirejs',
    'uglify',
    'clean:transpiled'
  ]);

  grunt.registerTask('default', ['build']);

};