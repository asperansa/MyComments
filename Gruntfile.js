module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        preprocess: {
            build: {
                src: 'js/index.js',
                dest: 'tmp/index.js'
            }
        },
        template: {
            options: {
                data: {
                    version: '<%= pkg.version %>'
                }
            },
            build: {
                src: '<%= preprocess.build.dest %>',
                dest: '<%= preprocess.build.dest %>'
            }
        },
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
                config: '.jscsrc'
            }
        },
        concat: {
            build: {
                src: '<%= preprocess.build.dest %>',
                dest: 'build/index.js'
            }
        },
        clean: {
            build: {
                src: 'tmp'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-complexity');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['preprocess', 'template', 'concat', 'uglify', 'clean']);
    grunt.registerTask('check', [
        'jscs',
        'jshint'
    ]);
    grunt.registerTask('default', [
        'check',
        'build'
    ]);
};