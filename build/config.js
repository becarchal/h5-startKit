
var path = require('path')
var address = require('address');
 
module.exports = {
    host: address.ip(),
    port: 80,
    publicPath: '/',
    alias: {
        lib: path.join(__dirname, '/../lib'),
    }
}