export const sidebar = {
  '/en/': [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/en/guide/' },
        { text: 'Getting Started', link: '/en/guide/getting-started' },
      ],
    },
    {
      text: 'demo',
      items: [{ text: 'demo', link: '/en/demo/' }],
    },
  ],
  '/': [
    {
      text: '介绍',
      items: [
        { text: '项目介绍', link: '/guide/' },
        { text: '快速开始', link: '/guide/getting-started' },
      ],
    },
    {
      text: '特性',
      items: [
        { text: 'Demo展示', link: '/features/demo' },
        { text: 'Api文档生成', link: '/features/api' },
        { text: '文件映射', link: '/features/mapping' },
      ],
    },
  ],
};
