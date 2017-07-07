<style>
    html {
        font-size: 56.5%;
    }
</style>

# 介绍
集成自动化本地测试，开发，文档编写和发布功能。

# 命令
| 命令 | 说明 | 特性 |
|-- |-- |-- |
| yarn dev | 启动本地node服务，可以通过`本地开发环境`浏览 | 实时监听文件保存变化，自动刷新页面 |
| yarn test | 启动测试框架，会读取`test`下所有后缀为`*.test.js`的文件 | 支持[`should`](http://shouldjs.github.io/)语法 |
| yarn doc:serve | 启动本地文档预览服务，可以通过`本地开发文档环境`浏览 | 实时监听文件保存变化，自动刷新页面；支持`markdown`|
| yarn build:prod | 构建打包`生产环境`代码，打包完成后会在根目录下生成`dist`，重复打包，会自动删除`dist`然后再生成；构建完成之后推到`git`服务器，手动点击`生产环境``发布按钮` | 自动压缩代码图片，生成`contentHash`避免浏览器缓存|
| yarn build:test | 和`yarn build:prod`一样，区别只在`生产环境`和`测试环境` | 同上 |

# 环境
| 名称 | 地址 | 说明 |
|-- |-- |-- |
| 线上正式环境 | http://*.weixin.tarh5.cn/three_startKit/index.html | -- |
| 线上测试环境 | http://h5wxfront.weisgj.com/three_startKit/index.html | -- |
| 本地开发环境 | http://localhost/ | 可以在`build/config`配置主机和端口号等信息 |
| 线上文档环境 | http://[分支名].h5doc.tarsocial.com/ | -- |
| 本地开发文档环境 | http://localhost:4000/ | -- |


# 注意事项
- 业务代码在`src`内部，不要在以外建立文件夹
- 分支名不允许大写
- 分支名不允许出现`.`字符


# 开发流程
