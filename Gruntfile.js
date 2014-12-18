/*global module:false*/
module.exports = function(grunt) {
	'use strict';

	var port = grunt.option('port') || 8000;

	// Load all grunt-related tasks
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );


	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
					'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
					'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
					' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},

		jshint: {
			options: {
				curly: true,
				// eqeqeq: true,
				// immed: true,
				strict: 0,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					'jQuery': true
				}
			},
			// files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
			files: ['Gruntfile.js', 'src/parallax_v3.js', 'test/**/*.js']
		},

		karma: {
			options: {
				autoWatch: false,
				browsers: ['PhantomJS'],
				colors: true,
				files: [
					'src/*.js',
					'test/*.js',
					{ pattern: 'test/fixture.html', watched:true, served:true, included:false },
				],
				frameworks: ['jasmine'],
				port: 8765,
				reporters: ['progress'],
				singleRun: true
			},
			unit: {

			}
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>\n'
			},
			build: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js']
				}
			}
		},

		connect: {
			server: {
				options: {
					port: port,
					base: '.'
				}
			}
		},

		watch: {
			main: {
				files: [ 'Gruntfile.js', 'src/<%= pkg.name %>.js', 'src/<%= pkg.name %>.css' ],
				tasks: 'build'
			}
		}

	});


	// Project tasks
	grunt.registerTask( 'default', [
		'jshint',
		'uglify',
		'karma'
	]);

	grunt.registerTask('build', [
		'jshint',
		'uglify'
	]);

	grunt.registerTask('test', [
		'jshint',
		'karma:unit'
	]);

	grunt.registerTask('serve', [
		'connect',
		'watch'
	]);

};
