"use strict";

module.exports = function(grunt) {
    // Files list
    var ConcatJSFiles = [
            'app/_Vendor/**/*.js',
            'app/app.js',
            'app/*.js',
            'app/_Shared/**/*.js',
            'app/**/*.js'
        ];
    var ConcatSASSFiles = [
            'app/app.scss',
            'app/**/*.scss'
        ];

    grunt.initConfig({
        // Concat
        concat:{
            jsFiles: {
                options: {
                    // define a string to put between each file in the concatenated output
                    separator: ';',
                    sourceMap: true,
                    sourceMapName: 'js/app.js.map'
                },
                files: {
                    'js/app.js': ConcatJSFiles
                }
            },
            sassFiles: {
                files: {
                    // the files to concatenate
                    'css/app.scss': ['app/app.scss','app/**/*.scss']
                }
            }
        },
        // Uglify
        uglify: {
            my_target: {
                files: {
                    'js/app.min.js': ConcatJSFiles
                }
            },
            options: {
                mangle: true,
                sourceMap: true
            },
        },

        // Compile SCSS
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/app.css': 'css/app.scss'
                }
            }
        },
        // Compile ES6 to js
        babel: {
            options: {
                sourceMap: true
            },
            es6: {
                files: [
                    {
                        expand: true,
                        src: ['app/**/*.es6'],
                        ext: '.js'
                    }
                ]
            }
        },
        // Include Source
        includeSource: {
            app: {
                files: {
                    //Overwriting index.html
                    'index.html': 'index.src.html'
                }
            }
        },
        // Watcher
        watch: {
            scripts: {
                files: ['app/**/**'],
                tasks: ['babel','concat','sass'],
                //tasks: ['includeSource'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('babel-preset-es2015');

    grunt.registerTask('default', ['watch']);
};
