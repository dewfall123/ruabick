# Ts api 文档自动生成

markdown 写一个 API 组件，传入 src 属性。

暂时只支持生成 interface 文档，而且必须要有 jsDoc 格式的注释。

```md
<API src="./api-demo.ts" lang="zh"></API>
```

生成的结果:

<API src="./api-demo.ts" lang="zh"></API>

Demo.vue Props 内容如下

```ts
export interface DemoProps {
  /**
   * 源码字符串(需经过encodeURIComponent处理)
   */
  code: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 描述
   */
  desc?: string;
  /**
   * 语言
   */
  lang?: string;
}
```
