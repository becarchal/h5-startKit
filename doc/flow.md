# 开发流程
接到新的h5开发任务后

#### 新建分支
从`master`剪出新的分支，新分支的名称非常关键，它作为新项目的名称，并且决定了开发，生产和测试的链接地址。
- 假设新的项目叫做`万达新年推广`，那么分支名可以叫做`wandaNewYear`
- 假设新的项目是一个项目计划，项目计划下有很多小项目，那么需要取一个`项目计划的名称`，而子项目跟在其后，比如项目计划名称叫做`万达2017年推广`，而`万达新年推广`作为其子项目，那么分支名称可以设置为`wanda2017/wandaNewYear`，另外的子项目同理分支名取为`wanda2017/others`

#### 开始开发
开始进行开发，在`src`目录下可以建立你的项目结构，必须要有的是`index.js`文件，也必须在`src`的第一层目录下。要在浏览器预览代码结果，请执行`yarn dev`，这样在`localhost`的80端口就可以访问了。如果你编辑了依赖文件，那么浏览器会自动刷新。

#### 提交发布测试
开发完成之后，如果要发布测试环境，本地执行`yarn build:test`，然后保存提交并且推送到远程git服务器，在公司的gitlab的web页面上找到`h5-startKit`项目，在`pipelines`菜单下，找到你的这次提交，然后点击`Deploy-Test`这样就发布成功了。

#### 提交发布正式
开发完成之后，如果要发布正式环境，本地执行`yarn build:prod`，。。。，然后点击`Deploy-Prod`这样就发布成功了。

#### 编写/预览/发布文档
如果需要给h5发布文档，本地执行`yarn doc:serve`，那么在本地`localhost:4000`就可以实时访问你的文档了，文档的编写在`doc`文件下，`SUMMARY`作为菜单，全部采用markdown语法，简洁实用。本地开发文档编写好了之后，可以按`ctrl+c`把监听文档变化实时刷新的进程停止掉，然后保存提交并且推送到远程git服务器，在公司的gitlab的web页面上找到`h5-startKit`项目，在`pipelines`菜单下，找到你的这次提交，然后点击`Deploy-Doc`这样就发布成功了。

#### 单元测试
如果需要给本次h5项目编写单元测试，请在`test`文件下，新建后缀为`*.test.js`的文件，语法采用最流行的`mocha`，`should`。编写好了测试文件之后，执行命令`yarn test`将会调用本地`chrome`浏览器作为运行环境，将你的单元测试跑一遍，结果将打在终端屏幕上，如果出现递归打印的情况，请`ctrl+c`关掉进程，再次执行一遍上述操作。