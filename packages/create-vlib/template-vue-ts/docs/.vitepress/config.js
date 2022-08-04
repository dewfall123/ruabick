import { defineConfig } from 'vitepress';
import { applyPlugins } from '@vfc/md-demo-plugins';
import { genTemp } from '@vfc/vite-plugin-gen-temp';
import { sidebar } from './sidebar.js';
import { resolve } from 'path';

export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: true,
  base: process.env.NODE_ENV === 'production' ? '/vfc' : '/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '@{projectName}',
      description: '@{description}',
    },
    '/en/': {
      lang: 'en-US',
      title: '@{projectName}',
      description: '@{description}',
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
      { icon: 'github', link: 'https://github.com/@{user}/@{projectName}' },
    ],
  },
  vue: {},
  vite: {
    plugins: [genTemp()],
    resolve: {
      alias: {
        '@{projectName}': resolve('./src/'),
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
