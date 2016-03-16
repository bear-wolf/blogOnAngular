var gulp = require('gulp'),
    cssmin = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    gulpSequence = require('gulp-sequence'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
    

var concatConfig = {
    file: 'bundle.css'
}

var config = {
    server: {
        baseDir: "./.create"
    },
    // tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Bar"
};


var file ={
    js: [
        './bower_components/jquery/dist/jquery.min.js',      
        './bower_components/angular/angular.min.js',        
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/jquery-ui/jquery-ui.min.js',
        './bower_components/growl/javascripts/jquery.growl.js',
        './bower_components/angular-resource/angular-resource.min.js',
        './bower_components/angular-route/angular-route.min.js'
    ],
    css: [
            './create/css/normalize.css',
            './bower_components/bootstrap/dist/css/bootstrap.min.css',
            './bower_components/jquery-ui/themes/start/jquery-ui.min.css',
            './bower_components/growl/stylesheets/jquery.growl.css',
            './create/css/fonts.css',
            './create/css/template.css',
            './create/css/style.css',
            './create/css/media.css']    
} 

var path = {
    production: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: '.production/',
        js: '.production/scripts/',
        image: '.production/images/',
        uploads: '.production/uploads/',
        style: '.production/style/',
        libs: '.production/libraries/',
        fonts: '.production/fonts/'        
    },
    create: { //Пути откуда брать исходники
        html: './.create/*.html',
        js: './.create/scripts/scripts.js',//В стилях и скриптах нам понадобятся только main файлы        
        css: './.create/css/**/*.css',
        style: './.create/style/**/*.css',
        libs: './.create/libraries/**/*.*',
        outLib: './.create/libraries/',
        img: './.create/images/**/*.*',      
        uploads: './.create/uploads/**/*.*',      
        fonts: './.create/fonts/**/*.*',
        tmp: './.create/tmp/**/*.css'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: './.create/**/*.html',
        js: './.create/js/**/*.js',
        css: './.create/css/**/*.css',
        style: './.create/style/**/*.css',
        image: './.create/images/**/*.*',
        uploads: './.create/uploads/**/*.*',      
        libs: './.create/libraries/**/*.*',
        fonts: './.create/fonts/**/*.*'      
    },
    clean: './.production'
};

gulp.task('css-concat', function () {         
    return gulp.src([file.css[0], file.css[1], file.css[2], file.css[3], file.css[4], file.css[5], file.css[5], file.css[6]])
        .pipe(concat(concatConfig.file))        
        .pipe(gulp.dest('.create/tmp'))
});
                     
gulp.task('css-build', function () {
  return gulp.src(path.create.tmp)    
        //.pipe(cssmin()) //Сожмем        
        .pipe(gulp.dest('.create/style/'))
        .pipe(gulp.dest(path.production.style))
        .pipe(reload({stream: true}));  
});

gulp.task('css:build',function(callback){
    gulpSequence('css-concat','css-build', callback);
})

gulp.task('js:set', function () {    
//    var str = "";
//    for (var i=0; i<fileToSite.js.length; i++ )
//        {
//            str += "'"+fileToSite.js[i]+"'";
//            if (i+1< fileToSite.js.length) str += ","
//        }    
    //str = "["+str+"]";
    gulp.src([ file.js[0], file.js[1], file.js[2], file.js[3], file.js[4], file.js[5], file.js[6] ])    
        .pipe(gulp.dest(path.create.outLib))
        .pipe(gulp.dest(path.production.libs)) 
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
                     
                     
gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default', ['webserver', 'css:build', 'js:set']);
