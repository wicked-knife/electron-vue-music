# 网易云音乐客户端

## 项目简介

本项目的主要技术栈为electron + vue全家桶。

项目使用了Vuetify组件库，对应组件的API可参考官方文档。

项目使用webpack辅助构建，使用electron-builder打包为可执行文件。

项目的API接口均来自<https://github.com/Binaryify/NeteaseCloudMusicApi>。感谢接口数据支持。

本项目深度集成了接口服务，可独立运行。

## 项目目录
```
├─main
└─renderer
    ├─API
    ├─base
    ├─common
    ├─components
    ├─iconfont
    ├─mixins
    ├─router
    ├─scss
    ├─store
    └─views
```

* main: 存放项目主进程的相关代码。主要用来进行主进程、渲染进程之间的通信。
* renderer: 存放项目的渲染进程相关代码。项目目前包含两个渲染进程，用来渲染主应用和登录界面。
* API: 存放项目的所有接口。按照其不同的功能所属，进行划分。
* base: 存放项目所用到的基础组件。
  > 注意与业务组件进行区分
* common: 存放项目的所用到的通用方法。
* components: 存放项目的业务组件。
  > 注意与基础组件进行区分
* iconfont: 字体图标库。
* mixins: 项目用到的mixin。
  > 多人协作开发时，mixin可能造成代码的可读困难，建议谨慎使用。
* router: 项目的路由管理目录。按照页面的不同所属，进行了对应的划分。
* scss: 项目的全局样式文件。
* store: 项目的状态管理目录。`persist`目录下用来对部分状态进行持久化管理。
* views: 项目的所有页面文件。所有的页面文件按照`router`目录下的路由声明进行划分。
