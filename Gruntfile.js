/**
 * grunt-pagespeed-ngrok
 * http://www.jamescryer.com/grunt-pagespeed-ngrok
 *
 * Copyright (c) 2014 James Cryer
 * http://www.jamescryer.com
 */
'use strict'

var ngrok = require('ngrok');

module.exports = function(grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  // Grunt configuration
  grunt.initConfig({
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
    },
    uglify: {
      my_target: {
        files: {
          'dist/views/js/main.js': ['views/js/main.js'],
          'dist/js/perfmatters.js': ['js/perfmatters.js']
        }
      }
    },
    shell: {
      minify_inline_css: {
        command: 'html-minifier --collapse-whitespace --minify-css '+
        'remove-comments --input-dir . --file-ext html --output-dir dist'
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCss: true
        },
        files: [{
          'dist/index.html': 'index.html'
        }]
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: 'views/images',
          src: ['*.{png,jpg,gif}'],
          dest: 'dist/views/images'
        },{
          expand: true,
          cwd: 'img',
          src: ['*.{png,jpg,gif}'],
          dest: 'dist/img'
        }],
      }
    },cssmin: {
       topcss: {
         expand: true,
         cwd: 'css',
         src: ['*.css', '!*.min.css'],
         dest: 'dist/css',
         ext: '.css'
       },
       viewscss:{
         expand: true,
         cwd: 'views/css',
         src: ['*.css', '!*.min.css'],
         dest: 'dist/views/css',
         ext: '.css'
       }
     }
  });

  // Register customer task for ngrok
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 9292;

    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

  grunt.loadNpmTasks('grunt-ngrok');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Register default tasks
  //grunt.registerTask('default', ['psi-ngrok']);
  grunt.registerTask('default', ['cssmin','uglify','shell','imagemin']);
}
