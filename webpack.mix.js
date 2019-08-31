let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .less('resources/less/app.less', 'public/css', {javascriptEnabled: true});

if (mix.inProduction()) {
    mix.version();
}

mix.browserSync('tibia.test');

mix.disableNotifications();
