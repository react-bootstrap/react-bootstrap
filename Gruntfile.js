module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    amdwrap: {
      src: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.js'],
        dest: 'amd/'
      },
      transpiled: {
        expand: true,
        cwd: 'transpiled/',
        src: ['**/*.js'],
        dest: 'amd/'
      }
    },

    copy: {
      amd: {
        files: [
          {
            src: ['**/*'],
            dest: 'amd/',
            cwd: 'tools/amd',
            expand: true
          }
        ]
      },
      cjs: {
        files: [
          {
            expand: true,
            cwd: 'transpiled/',
            src: ['**/*.js'],
            dest: 'cjs/'
          },
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'cjs/'
          },
          {
            src: ['**/*'],
            dest: 'cjs/',
            cwd: 'tools/cjs',
            expand: true
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
      options: {
        harmony: true
      },
      src: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/*.jsx'],
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
            src: ['**/*.jsx'],
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
          baseUrl: "amd",
          paths: {
            "react-bootstrap": "./index",
            almond: "../tools/vendor/almond"
          },
          packages: [
            {	name: 'react', location: '../node_modules/react', main: './react' }
          ],
          include: ["almond", "react-bootstrap"],
          exclude: ["react"],
          out: "amd/react-bootstrap.js",
          cjsTranslate: true,
          wrap: {
            startFile: "tools/wrap.start",
            endFile: "tools/wrap.end"
          },
          rawText: {
            'react': 'define({});'
          },
          optimize: "none"
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'amd/<%= pkg.name %>.js',
        dest: 'amd/<%= pkg.name %>.min.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-amd-wrap");
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
    'amdwrap',
    'copy',
    'browserify:test',
    'requirejs:dev',
    'uglify:build',
    'clean:transpiled'
  ]);

  grunt.registerTask('default', ['build']);

};
