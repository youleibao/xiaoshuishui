var gulp = require("gulp");//gulp基础库

var browserSync = require('browser-sync').create();//gulp服务器
var reload = browserSync.reload;
// 创建一个静态的服务器
gulp.task('browser-sync',function() {
    browserSync.init({
        server:{
            baseDir:"src"
        }
    });
});

var sass = require("gulp-sass");//编译sass的模块
var cssnano = require("gulp-cssnano");//压缩css的模块
var concat = require('gulp-concat');//合并css的模块
//编译sass的任务
gulp.task("scss", function() {
    gulp.src(["src/scss/**/*.scss", "!src/scss/**/_*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(cssnano())
//  .pipe(gulp.dest("dist/css"))
    .pipe(reload({stream:true}));
});


//压缩合并js文件的任务，并放到上线环境中
var uglify = require("gulp-uglify");
gulp.task("js", function(){
    gulp.src(["src/js/**/*.js"])
//      .pipe(uglify())//使用uglify进行压缩，并保留部分注释
        
        .pipe(gulp.dest("dist/js"));
});


//图片
var imagemin = require("gulp-imagemin");//优化图片
var cache = require("gulp-cache");//可以减少重复压缩
gulp.task("images", function() {
    //指明源文件路径、并进行文件匹配
    gulp.src("src/images/**/*.{png,jpg,gif}")
        .pipe(cache(imagemin({
            progressive:true,
            svgoPlugins:[{removeViewBox:false}],
            interlaced: true
        })))
        .pipe(gulp.dest("dist/images"));
});


//发布静态页面到dist目录中
var htmlmin = require("gulp-htmlmin");
gulp.task("html", function() {
    gulp.src("src/**/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest("dist/"));
});


//监控文件变化 
gulp.task("watch", ["browser-sync", "scss", "js", "images", "html"],function() { 
	
    gulp.watch("src/scss/**/*.scss", ["scss"]);
    gulp.watch("src/js/**/*.js",["js"]);
    gulp.watch('src/images/**/*.*',["images"]);
    gulp.watch('src/**/*.html',["html"]);
    gulp.watch("src/**/*.+(html|js)").on("change", reload);
});


gulp.task("default", function() {  
    gulp.start(["scss","images","js", "html", "browser-sync", "watch"]);  
});
