module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {}
        },
        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/postman_helper.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/postman_helper.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        watch: {
            scripts: {
                files: ['<%= jshint.files %>'],
                tasks: ['default'],
                options: {
                    spawn: true,
                    event: ['all']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
