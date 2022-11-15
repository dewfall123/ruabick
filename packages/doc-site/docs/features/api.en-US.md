# Vue API 文档自动生成

markdown 写一个 API 组件，传入 src 属性。

```md
<API src="../../../vitepress-demo-block/src/Demo.vue" lang="zh"></API>
```

生成的 API 文档:

<API src="../../../vitepress-demo-block/src/Demo.vue" lang="zh"></API>

Demo.vue Props 内容如下

```ts
const props = withDefaults(
  defineProps<{
    /**
     * @zh 源码字符串(需经过encodeURIComponent处理)
     */
    code: string;
    highlightedCode: string;
    title?: string;
    desc?: string;
    lang?: string;
    defaultExpand?: boolean;
    importMap?: Record<string, string>;
  }>(),
  {
    lang: 'vue',
    defaultExpand: false,
    importMap: () => ({}),
  },
);
```
