module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            scripts: {
                files: ['modules/*.js'],
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

};