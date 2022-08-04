import { defineConfig } from 'vitepress';
import { applyPlugins } from '@ruabick/md-demo-plugins';
import { genTemp } from '@ruabick/vite-plugin-gen-temp';
import { sidebar } from './sidebar';
import { resolve } from 'path';

export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: true,
  base: process.env.NODE_ENV === 'production' ? '/ruabick' : '/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'ruabick',
      description: '针对组件开发的VitePress',
    },
    '/en/': {
      lang: 'en-US',
      title: 'ruabick',
      description: 'A tool to document VUE components',
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    localeLinks: {
      text: '',
      items: [
        { text: '简体中文', link: '/' },
        { text: 'English', link: '/en/' },
      ],
    },
    nav: [{ text: '指南', link: '/guide' }],
    sidebar,
    algolia: {},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dewfall123/ruabick' },
    ],
  },
  vue: {},
  vite: {
    plugins: [genTemp()],
    resolve: {
      alias: {
        'my-button': resolve('./src/'),
      },
    },
  },
  markdown: {
    config: (md) => {
      applyPlugins(md);
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
});
