# @ruabick/vite-plugin-gen-api-doc

> 基于`vue-docgen-api`项目, 参考了很多[arco-design-vue](https://github.com/arco-design/arco-design-vue/tree/main/packages/arco-vue-scripts)的代码。

## 开始使用

### 步骤 1

安装插件 `pnpm add @ruabick/vite-plugin-gen-api-doc -D`

### 步骤 2

`.vitepress/config.js`

```js
import { genApiDoc } from '@ruabick/vite-plugin-gen-api-doc';

export default defineConfig({
  // ...
  vite: {
    plugins: [genApiDoc()],
  },
});
```

## 示例

注释用参考[vue-docgen-api](https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api)
