# 项目介绍

`ruabick` 是一个基于 VitePress 的组件开发工具。功能设计是`抄`的 [dumi](https://d.umijs.org/zh-CN)，但是`dumi`目前不支持`vue`。而且我觉得使用 [VitePress](https://vitepress.vuejs.org/)来构建 vue 组件文档更轻量。

::: info
项目前身是 [vitepress-for-components](https://github.com/dewfall123/vitepress-for-component)
:::

## 解决问题

VitePress 很轻量很快，但是在`写组件文档的场景`下有以下不足之处:

##### 1. 文档和 Demo 得重复写两遍。

> 参考 [dumi 的 demo 理念](https://d.umijs.org/zh-CN/guide/demo-principle)

##### 2. 文档，Demo 和源码在不同的目录，联系感不强。

> 源码和 Demo 一般在`src`目录下面，但是 VitePress 通常需要新建一个`docs`目录，它们之间应该放在同一个地方。
> 参考[dumi 的目录结构](https://d.umijs.org/zh-CN/guide/basic)

##### 3. 需要自动生成组件 API 文档功能。

> 基于`vue-docgen-api`自动生成 api 文档（参考[arco-design-vue](https://github.com/arco-design/arco-design-vue/tree/main/packages/arco-vue-scripts)的代码）。
