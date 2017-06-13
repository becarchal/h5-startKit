## 3dMoveLikeJagger

基于`three.js`的`3d-h5`开发框架。

在三维坐标系中，构建`环境`，制定`轨迹`和描绘若干`场景`。

### 场景
`摄像机的一组位置`

场景准备用`声明式`的方式来描述，提供类似`进入`，`退出`等生命周期函数。

### 轨迹
`一条` `监听事件`

获取轨迹对象之后，可以`注册`对运动路线的监听，比如当运动到标记物A时，执行某段代码。

### 环境

环境是若干模型组成的

## 使用

使用git将项目拉去下来，使用`3dmlj.start()`来启动和配置程序，
在界面中定制模型和轨迹的位置，可以随时保存，项目中`cache_data`是临时保存
界面可视化配置信息和模型轨迹等结果信息的地方。

可以使用`3dmlj.loadFreeze()`来导入自定义的场景。

使用`3dmlj.loadModal()`来导入自定义的模型。

分为设计制作，开发，和生产构建3个环境，对应到3个命令行
- npm run design
- npm run dev
- npm run prod