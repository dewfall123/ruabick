# 项目介绍

VFC `VitePress-for-Components` 是一个基于 VitePress 的组件开发工具。功能设计是`抄`的 [dumi](https://d.umijs.org/zh-CN)，但是`dumi`目前不支持`vue`。而且我觉得使用 [VitePress](https://vitepress.vuejs.org/)来构建 vue 组件文档更轻量。

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

## 功能特性

#### 1. 在`.md`文件里展示 demo

```html
<demo src="./demo.vue" title="Demo block" desc="use demo"></demo>
```

<demo src="./demo.vue" title="Demo block" desc="use demo"></demo>

#### 2. 文件映射

使用 `VFC` 一个常见的目录如下:

```md
docs
├── index.en-US.md // vfc 会自动处理`.[lang].md`后缀的文件
├── index.zh-CN.md
src
├── loading
│ ├── demo
│ │ └── demo.vue
│ ├── index.en-US.md // 通过 `frontmatter` 设置的`map.path`映射到 docs 目录下
│ ├── index.zh-CN.md
│ └── loading.vue
└── ...
```

### 3. API 自动生成

开发中...
