
module.exports = {
    host: '0.0.0.0',
    port: 80,
    publicPath: '/',
    alias: {
        lib: `${__dirname}/../lib`,
    },
    provide: {
        $: "jquery",
        _: 'lodash',
    },
    // provide
    // autoprefixer,
    // extraPostCSSPlugins,
    // extensions
    // alias
}
