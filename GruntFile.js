'use strict';

var ngrok = require('ngrok');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // configure the tasks
  grunt.initConfig({

    copy: {
      build: {
        cwd: 'src/',
        src: [ '**', '!**/*.png', '!**/*.jpg'],
        dest: 'build/',
        expand: true
      },
      nonbuild: {
        cwd: 'src/',
        src: [ '**' ],
        dest: 'build/',
        expand: true
      }
    },

    clean: {
      build: {
        src: [ 'build/' ]
      },
      stylesheets: {
        src: [ 'build/css/*.css' ]
      },
      scripts: {
        src: [ 'build/js/*.js' ]
      }
    },

    htmlmin: {
      build: {
        options: {
          removecomments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html'
        }
      }
    },

    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'build/css/',
          src: '*.css' ,
          dest: 'build/css/'
        }]
      }
    },

    uglify: {
      build: {
        options: {
          mangle: false
        },
        //only minifying perfmatters.js
        files: [{
          expand: true,
          cwd: 'build/js/',
          src: '*.js',
          dest: 'build/js/'
        }]
      }
    },

    imagemin: {
        build: {
          options: {
            optimizationlevel: 7
          },
          files: [{
            expand: true,
            cwd: 'src/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'build/'
          }]
       }
    },

    watch: {
      stylesheets: {
        files: 'src/**/*.css',
        tasks: [ 'stylesheets' ]
      },
      scripts: {
        files: 'src/**/*.js',
        tasks: [ 'scripts' ]
      },
      copy: {
        files: [ 'src/**' ],
        tasks: [ 'copy' ]
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'build/',
          hostname: '*'
        }
      }
    },

    pagespeed: {
      options: {
        nokey: true,
        locale: "en_GB",
        threshold: 40
      },
      local: {
        options: {
          strategy: "desktop"
        }
      },
      mobile: {
        options: {
          strategy: "mobile"
        }
      }
    }

  });

  // ngrok setup
  grunt.registerTask(
    'psi-ngrok',
    'Run pagespeed with ngrok',
    function() {
      var done = this.async();
      var port = 8000;

      ngrok.connect(port, function(err, url) {
        if (err !== null) {
          grunt.fail.fatal(err);
          return done();
        }
        console.log(url);
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

  grunt.registerTask(
    'server',
    'Connect to local server.',
    ['connect', 'psi-ngrok']
  );

  grunt.registerTask(
    'stylesheets',
    'Compiles the stylesheets.',
    ['cssmin']
  );

  grunt.registerTask(
    'scripts',
    'Compiles the JavaScript files.',
    [ 'uglify']
  );

  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory.',
    [ 'clean:build', 'copy', 'htmlmin', 'stylesheets', 'scripts', 'imagemin' ]
  );

  grunt.registerTask(
    'default',
    'Watches the project for changes, automatically builds them and runs a server.',
    [ 'build', 'server' ]
  );

  grunt.registerTask(
    'nonbuild',
    'Copies over the project without any changes and watches on local host.',
    [ 'copy:nonbuild', 'server' ]
  );

};