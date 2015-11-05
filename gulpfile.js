var gulp		= require('gulp');
// var concat		= require('gulp-concat');
// var del			= require('del');
var uglify		= require('gulp-uglify');
var jshint		= require('gulp-jshint');
var rename		= require('gulp-rename');
var connect		= require('gulp-connect');

var paths = {
	css: ['src/*.css'],
	js: ['src/*.js']
};

var JSHINTRC = {
	"sub"			: true,
	"strict"		: true,
	"globalstrict"	: true,
	"validthis"		: true,
	"trailing"		: true,
	"white"			: true,
	"browser"		: true,
	"curly"			: true,
	"eqnull"		: true,
	"eqeqeq"		: true,
	"loopfunc"		: true,
	"indent"		: 4,
	globals: {
		console: false
	}
};



gulp.task('dist', function () {
	return gulp.src(paths.js)
		.pipe(jshint(JSHINTRC))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('./dist'));
});


gulp.task('watch', function() {
	// gulp.watch(paths.sass, ['css']);
	// gulp.watch(paths.js, ['js']);	// livereload()
});


gulp.task('test', function() {
	// karma somehting
});

gulp.task('clean', function() {
	return del([
		'dist/*.js',
	]);
});

gulp.task('connect', function() {
	connect.server({
		livereload: true
	});
});


/* ---------------------------------------
 	2.	Server
 -----------------------------------------*/

gulp.task('default', ['build', 'watch']);
gulp.task('build', ['clean', 'dist']);
