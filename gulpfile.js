const gulp = require('gulp');
const del = require('del');
const sync = require('browser-sync');

// HTML

const pug = require('gulp-pug');

// CSS

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');

// JS

const babel = require('gulp-babel');


// Pug

const templates = () =>
  gulp.src('src/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('public'))
    .pipe(sync.stream());

// HTML

const html = () =>
  gulp.src('src/*.html')
    .pipe(gulp.dest('public'))
    .pipe(sync.stream());

// Styles

const styles = () =>
  gulp.src('src/sass/style.s[ac]ss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([
      require('postcss-custom-properties')(),
      require('autoprefixer')()
    ]))
    .pipe(gulp.dest('public/css'))
    .pipe(sync.stream());

// JS

const js = () =>
  gulp.src('src/js/index.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest('public/js'))
    .pipe(sync.stream());

// Clean

const clean = () =>
  del([
    'public/img/**',
    'public/fonts/**'
  ]);

// Copy

const copy = () => 
  gulp.src([
    'src/img/**',  
    'src/fonts/**'  
  ], { base: 'src' })
    .pipe(gulp.dest('public'))
    .pipe(sync.stream());

// Watch

const watch = () => {
  gulp.watch('src/*.html',  gulp.series(html));
  gulp.watch('src/*.pug',   gulp.series(templates));
  gulp.watch('src/sass/**', gulp.series(styles));
  gulp.watch('src/js/**',   gulp.series(js));
  gulp.watch([
    'src/img/**',
    'src/fonts/**'
  ], gulp.series(clean, copy));
};

// Server

const server = () => {
  sync.init({
    server: {
      baseDir: './public'
    },
    ui: false,
    notify: false
  });
};

// Default task

exports.default = gulp.series(
  gulp.parallel(templates, html, styles, js, clean, copy),
  gulp.parallel(watch, server)
);