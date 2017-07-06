# 阿里云

1. npm install ali-oss

```javascript
var OSS = require('ali-oss');
var client = new OSS({
  region: '<oss region>',
  accessKeyId: '<Your accessKeyId>',
  accessKeySecret: '<Your accessKeySecret>',
  bucket: '<Your bucket name>'
});]
```


# 查看Bucket列表
```javascript
co(function* () {
  var result = yield client.listBuckets();
  console.log(result);
}).catch(function (err) {
  console.log(err);
});
```