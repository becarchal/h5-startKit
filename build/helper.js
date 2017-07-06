var fs = require('fs')

module.exports = {
    //检测文件或者文件夹存在 nodeJS
    fsExistsSync(path) {
        try {
            fs.accessSync(path, fs.F_OK);
        } catch (e) {
            return false;
        }
        return true;
    }
}