
//Importamos modulos - dependencias
const { src, dest, watch, series, parallel } = require('gulp');

//Importamos solo una dependencia

//CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');


function miCss(done){
    //Compilar SASS
    
    //Paso 1: Identificar archivo
    src('src/scss/app.scss')

    //SOURCEMAP
    .pipe( sourcemaps.init() )

    //Paso 2: Compilar archivo
    //Le podemos pasar parametros a la funcion sass
    // por ejemplo outputStyle: 'compressed' para minificar el css
    .pipe( sass({outputStyle: 'expanded'}) )
    //Tambien hemos instalado una dependencia llamada autoprefixer
    //que nos permitira añadir los prefijos css automatico
    .pipe( postcss([ autoprefixer(), cssnano() ]) )

    //SOURCEMAP
    .pipe( sourcemaps.write('.') )

    //Paso 3: Guarda el css
    .pipe( dest('build/css') )

    done();
}

//Funcion watch revisa el fichero cuando hay modificaciones
//luego de revisarlo volvemos a ejecutar la funcion css
function dev(){
    //watch( 'src/scss/app.scss', miCss );
    //usando comodines
    watch( 'src/scss/**/*.scss', miCss );

}

exports.miCss = miCss;
exports.dev = dev;

//series - Se inicia una tarea y cuando se finaliza inicia la otra
//parallel - Todas inicias al mismo tiempo
exports.default = series(miCss, dev);