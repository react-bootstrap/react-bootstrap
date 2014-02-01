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
      amd: ['amd']
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
        src: 'dist/<%= pkg.name %>.min.js',
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
  grunt.loadNpmTasks('grunt-es6-module-wrap-default');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', [
    'clean:amd',
    'clean:cjs',
    'react',
    'transpile',
    'es6_module_wrap_default',
    'browserify',
    'shell:requirejs',
    'uglify',
    'clean:transpiled'
  ]);

  grunt.registerTask('default', ['build']);

};