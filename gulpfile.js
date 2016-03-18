var gulp = require('gulp'),
    cssmin = require('gulp-minify-css'),
    watch = require('gulp-watch'),
	pngquant = require('imagemin-pngquant'),
	imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    gulpSequence = require('gulp-sequence'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
    

var concatConfig = {
    file: 'bundle.css'
}

var config = {
    server: {
        baseDir: "./.production"
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
            './.create/css/normalize.css',
            './bower_components/bootstrap/dist/css/bootstrap.min.css',
            './bower_components/jquery-ui/themes/start/jquery-ui.min.css',
            './bower_components/growl/stylesheets/jquery.growl.css',
            './.create/css/fonts.css',
            './.create/css/template.css',
            './.create/css/style.css',
            './.create/css/media.css']    
} 

var path = {
    production: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: './.production/',
        scripts: './.production/scripts/',
        image: './.production/images/',
        uploads: './.production/uploads/',
        style: './.production/style/',
		partials: './.production/partials/',
        libs: './.production/libraries/',
        fonts: './.production/fonts/'        
    },
    create: { //Пути откуда брать исходники
        html: './.create/*.html',
        scripts: './.create/scripts/**/*.js', 
        css: './.create/css/**/*.css',
        style: './.create/style/**/*.css',
        libs: './.create/libraries/**/*.*',
        outLib: './.create/libraries/',
        img: './.create/images/**/*.*',     
		partials: './.create/partials/**/*.*',
        uploads: './.create/uploads/**/*.*',      
        fonts: './.create/fonts/**/*.*',
        tmp: './.create/tmp/**/*.css'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: './.create/**/*.html',
        scripts: './.create/scripts/**/*.js',
        css: './.create/css/**/*.css',
        style: './.create/style/**/*.css',
        image: './.create/images/**/*.*',
		partials: './.create/partials/**/*.*',
        uploads: './.create/uploads/**/*.*',      
        libs: './.create/libraries/**/*.*',
        fonts: './.create/fonts/**/*.*'      
    },
    clean: './.production'
};

gulp.task('html:build', function () {
    gulp.src(path.create.html) 
        .pipe(gulp.dest(path.production.html))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', function () {
    gulp.src(path.create.scripts) 
        .pipe(gulp.dest(path.production.scripts))
        .pipe(reload({stream: true}));
});

gulp.task('partials', function () {
    gulp.src(path.create.partials) 
        .pipe(gulp.dest(path.production.partials))
        .pipe(reload({stream: true}));
});

//gulp.task('image', function () {
//    gulp.src(path.create.img) //Выберем наши картинки
//        .pipe(imagemin({ progressive: true, svgoPlugins: [{removeViewBox: false}], interlaced: true }))
//        .pipe(gulp.dest(path.production.img)) //И бросим в production       
//});


//gulp.task('js:build', function () {
//    gulp.src(path.create.libs) //Найдем наш main файл        
//        //.pipe(uglify().on('error', gutil.log))        
//        .pipe(gulp.dest(path.production.libs)) //Выплюнем готовый файл в production 
//        .pipe(reload({stream: true}));     
//});

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

gulp.task('css',function(callback){
    gulpSequence('css-concat','css-build', callback);
})

gulp.task('fonts:build', function () {
    gulp.src(path.create.fonts) 
        .pipe(gulp.dest(path.production.fonts)) 
});


gulp.task('libs', function () {    
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

gulp.task('uploads', function () {
    gulp.src(path.create.uploads)
        .pipe(imagemin({ progressive: true, svgoPlugins: [{removeViewBox: false}],use: [pngquant()], interlaced: true}))
        .pipe(gulp.dest(path.production.uploads))
});

gulp.task('build', [
    'html:build',         
    'uploads',
    'fonts:build',
	'scripts',
	'partials'
]);


gulp.task('watch', function(){  
    watch([path.watch.css], function(event, cb) {
        gulp.start('css');
    });   
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.scripts], function(event, cb) {
        gulp.start('scripts');
    });
//    watch([path.watch.uploads], function(event, cb) {
//        gulp.start('uploads:build');
//    });
//    watch([path.watch.fonts], function(event, cb) {
//        gulp.start('fonts:build');
//    });    
});

gulp.task('default', ['build', 'webserver', 'watch', 'css', 'libs']);
