import { defineConfig } from 'vitepress';
import { applyPlugins } from '@ruabick/md-demo-plugins';
import { genTemp } from '@ruabick/vite-plugin-gen-temp';
import { genApiDoc } from '@ruabick/vite-plugin-gen-api-doc';
import { resolve } from 'path';

export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: true,
  title: '@{projectName}',
  base: process.env.NODE_ENV === 'production' ? '/@{projectName}' : '/',
  vue: {},
  vite: {
    plugins: [genTemp(), genApiDoc()],
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
  buildEnd() {
    process.exit(0);
  },
});
