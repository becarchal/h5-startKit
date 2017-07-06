
var path = require('path')

module.exports = {
    host: '0.0.0.0',
    port: 80,
    publicPath: '/',
    alias: {
        lib: path.join(__dirname, '/../lib'),
    }
}