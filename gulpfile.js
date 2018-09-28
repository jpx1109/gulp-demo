var gulp = require("gulp");
var cssmin = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var base64 = require("gulp-base64"); 
var concat = require("gulp-concat");
var inject = require("gulp-inject");
var connect = require("gulp-connect");//fuwuqi

gulp.task("css",function(){
	gulp.src(["./src/css/zhuye.css","./src/css/ziye.css","./src/css/ziye2.css","./src/css/ziye3.css","./src/css/ziye4.css","./src/css/ziye5.css","./src/css/ziye6.css","./src/css/ziye8.css","./src/css/ziye9.css","./src/css/ziye10.css","./src/css/ziye11.css","./src/css/ziye12.css","./src/css/ziye12.css","./src/css/zhuye7.css"])
		.pipe(cssmin())
		.pipe(concat("all.css"))
		.pipe(base64())
		.pipe(gulp.dest("./dist/css"));
});
gulp.task("javascript",function(){
	gulp.src(["./src/js/move.js"])
		.pipe(concat("all.j s"))
		.pipe(uglify())
		.pipe(gulp.dest("./dist/js"))
});
gulp.task("images",function(){
	gulp.src("./src/images/**/*")
		.pipe(imagemin())
		.pipe(gulp.dest("./dist/images"));
});
gulp.task("html",["css","javascript"],function(){
	gulp.src(["./src/index.html"])
		.pipe(gulp.dest("./dist"));
	gulp.src(["./src/html/**/*"])
		.pipe(gulp.dest("./dist/html"));
});
gulp.task("inject",["html"],function(){
	gulp.src("./dist/index.html")
		.pipe(inject(gulp.src(['./dist/css/all.css','./dist/js/all.js']),{relative:true}))
		.pipe(gulp.dest('./dist'));
	gulp.src("./dist/html/**/*")
		.pipe(inject(gulp.src(['./dist/css/all.css','./dist/js/all.js']),{relative:true}))
		.pipe(gulp.dest('./dist/html'));
});
gulp.task("watch",function(){
	gulp.watch("./src/css/**/*",["css"]);
	gulp.watch("./src/js/**/*",["javascript"]);
});
gulp.task("connect",function(){
	connect.server({
		root:"dist"
	})
});
gulp.task("default",["images","inject","watch","connect"]);