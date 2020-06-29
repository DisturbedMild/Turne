
const gulp = require('gulp');
const browserSync = require('browser-sync');

const gulpLoadPlugins = require('gulp-load-plugins');

var sourcemaps = require('gulp-sourcemaps');
//var urlAdjuster = require('gulp-css-url-adjuster');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const postcss = require('gulp-postcss');
const postssMergeRules = require('postcss-merge-rules');
const mqpacker = require('css-mquery-packer');
const sortCSSmq = require('sort-css-media-queries');
const twig = require('gulp-twig');
const spritesmith = require('gulp.spritesmith');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var urlencode = require('gulp-css-urlencode-inline-svgs');
var cssbeautify = require('gulp-cssbeautify');
var imageResize = require('gulp-image-resize');
var merge = require('merge-stream');
var gm = require('gulp-gm');
const config = {
    scss: 'scss/**/*.scss',
    css:  'dist/css',
    html: 'dist/*.html',
    template: 'templates/*.twig',
    nunjucksPath: 'templates/',
    templateWatch: 'templates/**/*.twig',
    baseDir: 'dist',
    spriteDir: 'sprite'
};

/**********sprite country flag start***************/
const configSprite = {
    imagesDirectory: 'generated-sprite/source/original-images',
    imagesDirectoryGenerated: 'generated-sprite/source/generated-images',
    spriteImagesDir: 'generated-sprite/Images',
    spriteScssDir: 'generated-sprite/scss'
};
const configSpriteStandart = {
    imagesDirectory: 'generated-sprite/source/original-images/sprite',
    imagesDirectoryGenerated: 'generated-sprite/source/generated-images/sprite',
    spriteImagesDir: 'generated-sprite/Images/sprite',
    spriteScssDir: 'generated-sprite/scss/sprite'
};

gulp.task('generateRetinaImages', gulp.series(() => {
    return gulp.src(configSprite.imagesDirectory +'/**/*.{jpg,png}')
        .pipe(gm(function (gmfile) {

            return gmfile.trim();

        }))
        .pipe(imageResize({ width : 52 }))
        .pipe(rename(function (path) { path.basename += "@2x"; }))
        .pipe(gulp.dest(configSprite.imagesDirectoryGenerated));

}));

gulp.task('generateNormalImages', gulp.series(() => {
    return gulp.src('generated-sprite/source/original-images/**/*.{jpg,png}')
        .pipe(gm(function (gmfile) {

            return gmfile.trim();

        }))
        .pipe(imageResize({ width : 26 }))


        .pipe(gulp.dest(configSprite.imagesDirectoryGenerated));


}));

// Generate Sprite icons
gulp.task('sprite', function () {
    // Generate our spritesheet
    var spriteData = gulp.src(configSprite.imagesDirectoryGenerated + '/*.*')
        .pipe(spritesmith({
            imgName: 'sprite-country-flag.png',
            imgPath: '../../Images/sprite-country-flag.png',
            cssName: '_sprite-country-flag.scss',
            retinaSrcFilter: configSprite.imagesDirectoryGenerated + '/*@2x.png',
            retinaImgName: 'sprite-country-flag@2x.png',
            retinaImgPath: '../../Images/sprite-country-flag@2x.png',
            padding: 2,
            cssVarMap: function (sprite) {
                sprite.name = 'sprite-flag--' + sprite.name;
            }
        }));

    // Pipe image stream onto disk
    var imgStream = spriteData.img
        .pipe(gulp.dest(configSprite.spriteImagesDir));

    // Pipe CSS stream onto disk
    var cssStream = spriteData.css
        .pipe(gulp.dest(configSprite.spriteScssDir));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
});

gulp.task('sprite-standart', function () {
    // Generate our spritesheet
    var spriteData = gulp.src(configSpriteStandart.imagesDirectoryGenerated + '/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            imgPath: '../../../Images/sprite.png',
            cssName: '_sprite.scss',
            retinaSrcFilter: configSpriteStandart.imagesDirectoryGenerated + '/*@2x.png',
            retinaImgName: 'sprite@2x.png',
            retinaImgPath: '../../../Images/sprite@2x.png',
            padding: 0,
            cssVarMap: function (sprite) {
                sprite.name = 'icons--' + sprite.name;
            }
        }));

    // Pipe image stream onto disk
    var imgStream = spriteData.img
        .pipe(gulp.dest(configSprite.spriteImagesDir));

    // Pipe CSS stream onto disk
    var cssStream = spriteData.css
        .pipe(gulp.dest(configSprite.spriteScssDir));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
});

gulp.task('generate-sprite',  gulp.series(['generateNormalImages', 'generateRetinaImages', 'sprite'], function(done) {
    // task code here
    done();
}));

/**********sprite country flag end***************/

gulp.task('nunjucksyt', function () {
    return gulp.src(config.template)
        .pipe(twig({
            data: {
                title: 'Gulp and Twig',
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            }
        }))
        .pipe(gulp.dest(config.baseDir));
});
gulp.task('sass', function () {
    return gulp.src(config.scss)
        .pipe(sourcemaps.init())
        .pipe($.sass({precision: 8, outputStyle: 'expanded'}).on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe(urlencode())
        .pipe(sourcemaps.write("./map"))
        .pipe(gulp.dest(config.css))
        .pipe(reload({stream: true}));
});

gulp.task('sass-prod', function () {
    const plugins = [
        mqpacker({sort: sortCSSmq.desktopFirst}),
        postssMergeRules()

    ];
    return gulp.src(config.scss)
        .pipe($.sass({precision: 8, outputStyle: 'expanded'}).on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe(urlencode())
        .pipe(postcss(plugins))
        .pipe(cssbeautify({
            indent: '  ',
            openbrace: 'end-of-line',
            autosemicolon: true
        }))
        .pipe(gulp.dest(config.css))
        .pipe(reload({stream: true}));
});

gulp.task('css-min', gulp.series(function () {
   return gulp.src('dist/css/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest(config.css));
}));
gulp.task('js-min', gulp.series(function () {
    return gulp.src('dist/js/**/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('dist/js'));
}));

gulp.task('server', gulp.series('sass', function () {
    browserSync({
        notify: false,
        server: {
            baseDir: config.baseDir
        },
        port: 3000

    });
    gulp.watch(config.scss, gulp.series('sass'));
    gulp.watch(config.templateWatch, gulp.series('nunjucksyt'));
    gulp.watch(config.html).on('change', reload);
}));

gulp.task('server-prod', gulp.series('sass-prod', function () {
    browserSync({
        notify: false,
        server: {
            baseDir: config.baseDir
        },
        port: 3000

    });
    gulp.watch(config.scss, gulp.series('sass-prod'));
    gulp.watch(config.templateWatch, gulp.series('nunjucksyt'));
    gulp.watch(config.html).on('change', reload);
}));


gulp.task('min',  gulp.series('css-min', 'js-min', function(done) {
    // task code here
    done();
}));

gulp.task('server-start-prod',  gulp.series('server-prod', 'nunjucksyt', function(done) {
    // task code here
    done();
}));

gulp.task('default',  gulp.series('server', function(done) {
    // task code here
    done();
}));


