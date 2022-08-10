## 文件映射

使用 `ruabick` 一个常见的目录如下:

```md
docs
├── index.en-US.md // ruabick 会自动处理`.[lang].md`后缀的文件
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
