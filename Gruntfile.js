module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/concatenated/style-svg.css': 'sass/style-svg.scss',
          'css/concatenated/style-png.css': 'sass/style-png.scss',
          'css/concatenated/style-fallback.css': 'sass/style-fallback.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8']
      },
      // single_file: {
      //   // options: {
      //       // Target-specific options go here.
      //   // },
      //   src: 'css/style.css',
      //   dest: 'css/style.prefixed.css'
      // }
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'css/concatenated/*.css',
        dest: 'css/prefixed/'
      }
    },

    cssmin: {
      combine: {
        files: {
          'css/style-svg.minified.css': 'css/prefixed/style-svg.css',
          'css/style-png.minified.css': 'css/prefixed/style-png.css',
          'css/style-fallback.minified.css': 'css/prefixed/style-fallback.css'
        }
      }
    },

    "comment-media-queries": {
      default_options: {
        files: {
          'css/style.ie8.css': ['css/prefixed/style-png.css']
        }
      }
    },

    jshint: {
      beforeconcat: ['js/*.js']
    },

    concat: {
      dist: {
        src: [
          'js/libs/*.js',
          'js/global.js'
        ],
        dest: 'js/build/global.concat.js',
      }
    },

    uglify: {
      build: {
        src: 'js/build/global.concat.js',
        dest: 'js/build/global.min.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: 8000,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },

    svgmin: {
      options: {
        plugins: [{
            removeViewBox: false
        }]
      },
      dist: {                   // Target
        files: [{               // Dictionary of files
            expand: true,       // Enable dynamic expansion.
            cwd: 'design-files/grunticons',     // Src matches are relative to this path.
            src: ['**/*.svg'],  // Actual pattern(s) to match.
            dest: 'design-files/grunticons/minify',       // Destination path prefix.
            //ext: '-min.svg'     // Dest filepaths will have this extension.
            // ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
        }]
      }
    },

    grunticon: {
      myIcons: {
        files: [{
          expand: true,
          cwd: 'design-files/grunticons/minify',
          src: ['*.svg', '*.png'],
          dest: "design-files/grunticons/build"
        }],
        options: {
          // optional grunticon config properties
          // SVGO compression, false is the default, true will make it so
          // svgo: true,

          // PNG compression, false is the default, true will make it so
          // pngcrush: true,

          // CSS filenames
          // datasvgcss: "icons.data.svg.css",
          // datapngcss: "icons.data.png.css",
          // urlpngcss: "icons.fallback.css",

          // preview HTML filename
          // previewhtml: "preview.html",

          // grunticon loader code snippet filename
          // loadersnippet: "grunticon.loader.js",

          // folder name (within dest) for png output
          // pngfolder: "png",

          // prefix for CSS classnames
          cssprefix: ".icon",

          // defaultWidth: "32px",
          // defaultHeight: "32px",

          // define vars that can be used in filenames if desirable, like foo.colors-primary-secondary.svg
          // colors: {
          //         primary: "red",
          //         secondary: "#666"
          // },

          // css file path prefix - this defaults to "/" and will be placed before the "dest" path when stylesheets are loaded.
          // This allows root-relative referencing of the CSS. If you don't want a prefix path, set to to ""
          // cssbasepath: "/",
          // customselectors: {
          //         "cat" : ["#el-gato"],
          //         "gummy-bears-2" : ["nav li a.deadly-bears:before"]
          // },

          // template: "example/default-css.hbs"
        }
      }
    },

    jekyll: {
      prod: {
        src: '.',
        dest: '_site'
      }
    },

    watch: {

      // options: {
      //   livereload: true,
      // },

      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify', 'jshint'],
        options: {
          spawn: false,
        }
      },

      css: {
        files: ['sass/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin', 'comment-media-queries'],
        options: {
          spawn: false,
        }
      },

      images: {
        files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      },

      jekyll: {
        files: ['*.html', '_posts/*.markdown', '_layouts/*.html', '_includes/*.html', 'sass/*.scss', 'css/*.css', 'images/*.{png,jpg,gif}', 'js/**/*.js'],
        tasks: ['jekyll:prod'],
        options: {
          spawn: false,
        }
      }

    },
    
  });

  require('load-grunt-tasks')(grunt);

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'comment-media-queries', 'imagemin', 'grunticon:myIcons', 'jekyll:prod']);

  grunt.registerTask('dev', ['watch']); // connect removed for now


};
