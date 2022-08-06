##

像 dumi 一样使用 `VitePress`，此插件包含一个`initial-scan`脚本和一个vite插件，需要配合使用。


## 参考示例

示例项目 https://github.com/dewfall123/ruabick/tree/master/packages/doc-site

示例站点 https://dewfall123.github.io/ruabick/guide/

## 使用步骤

### 步骤 1

`pnpm add @ruabick/vite-plugin-gen-temp -D`

### 步骤 2

修改 package.json 脚本。

::: warning
注意`vitepress dev .docs` 是`.docs`而不是`docs`，因为`.docs`是脚本处理后的目录。
:::

```json
{
  "dev": "initial-scan && vitepress dev .docs"
}
```

### 步骤 3

增加插件配置

```js
// .vitepress/config.js
import { genTemp } from '@ruabick/vite-plugin-gen-temp';

export default defineConfig({
  ...
  vite: {
    plugins: [genTemp()],
  }
  ...
})
```

