module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        files: {
          // target.css file: source.less file
          "./sass/styles.scss" : "./sass/styles.scss"
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    }
  }};

    postcss: {
      options: {
        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: './css/' // ...to the specified directory
        },

        processors: [
          require('cssgrace'), // IE fallbacks
          require('autoprefixer')({
            browsers: 'last 3 versions', // add vendor prefixes
            remove: false // doesn't strip un-needed prefixes - only use with new code.
          }),
          require('cssnano')({
            zindex: false,
            autoprefixer: false
          }) // minify the result
        ]
      },
      dist: {
        src: './css/styles.scss'
      }
    },

    watch: {
      options: {
        livereload: true
      },

      css: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['./css/**/*.less'],
        tasks: ['less', 'postcss'],
        options: {
          nospawn: true
        }
      },
      // Page will reload for changes to the following file types too
      otherFiles: {
        files: ['./**/*.php', './**/*.html', './**/*.htm'],
        tasks: [],
        options: {
          nospawn: true
        }
      },
      // Force Grunt to restart if the config changes
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
};
