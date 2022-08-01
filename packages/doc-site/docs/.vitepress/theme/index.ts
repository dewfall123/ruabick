import DefaultTheme from 'vitepress/theme';
import DemoBlock from '@vfc/vitepress-demo-block';
import '@vfc/vitepress-demo-block/dist/style.css';
import './var.css';

// import { DemoTag } from '@vfc/md-demo-plugins';

export default {
  ...DefaultTheme,

  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`.
    // router is VitePress' custom router. `siteData` is
    // a `ref` of current site-level metadata.
    app.component('demo', DemoBlock);
  },
};
