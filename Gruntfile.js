module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: '<%= concat.build.dest %>',
                dest: 'build/index.min.js'
            }
        },
        jshint: {
            src: ['js/*.js', 'gruntfile.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        jscs: {
            src: ['js/*.js', 'gruntfile.js'],
            options: {
                config: ".jscsrc"
            }
        },
        concat: {
            build: {
                src: '<%= preprocess.build.dest %>',
                dest: 'build/index.js'
            }
        },
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['definer:all']
            }
        },
        definer: {
            all: {
                target: 'js/all.js',
                directory: 'js/',
                clean: {
                    $: 'js/jquery.js',
                    _: 'js/underscore.js'
                },
                jsdoc: {
                    "file": "File description",
                    "copyright": "2014 Nadezhda Lazareva, asperansa@gmail.com",
                    "license": "Free license",
                    "name": "package.json"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-definer');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-complexity');
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('build', ['preprocess', 'template', 'concat', 'uglify', 'clean']);
    grunt.registerTask('check', ['jscs','jshint']);
    grunt.registerTask('default', ['check','build']);

};