module.exports = function( grunt ) {

	// Load all tasks
	require( 'load-grunt-tasks' )( grunt );

	// Show elapsed time
	require( 'time-grunt' )( grunt );

	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),
		sass: {
			dev: {
				files: [{
					expand: true,
			        cwd: 'src/assets/scss',
			        src: ['*.scss', '**/*.scss'],
			        dest: 'dist/assets/css',
			        ext: '.css'
				}],
				options: {
					style: 'extended',
					precision: 7,
					sourceMap: false,
					sourceMapEmbed: false
				}
			},
			build: {
				files: [{
					expand: true,
			        cwd: 'src/assets/scss',
			        src: ['*.scss', '**/*.scss'],
			        dest: 'dist/assets/css',
			        ext: '.min.css'
				}],
				options: {
					style: 'compressed',
					precision: 7,
					sourceMap: false,
					sourceMapEmbed: false
				}
			}
		},
		cmq: {
		    options: {
		      log: false
		    },
		    your_target: {
		      files: {
		        'dist/assets/css/': [ 'dist/assets/css/*.css' ]
		      }
		    }
		},
		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer-core')({
						browsers: ['last 2 versions', 'ie 9', 'ie 10', 'android 4.3', 'android 4.4', 'firefox 34', 'firefox 35', 'opera 27', 'opera 26']
					})
				]
			},
			dev: {
				options: {
					map: false,
				},
				src: ['dist/assets/css/mk-buttons.css']
			},
			build: {
				src: ['dist/assets/css/mk-buttons.min.css']
			}
		},
		watch: {
			sass: {
				files: [
					'src/assets/scss/**/*.scss',
				],
				tasks: ['sass:dev', 'postcss:dev']
			}
		}
	});

	// Register tasks
	grunt.registerTask('default', [
		'dev'
	]);
	grunt.registerTask('dev', [
		'sass:dev',
		'postcss:dev',
		'watch',
	]);
	grunt.registerTask('build', [
		'sass:build',
		'cmq',
		'postcss:build',
	]);
};