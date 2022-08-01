import { MarkdownRenderer } from 'vitepress';
import { FenceDemoTag } from './constants';
import { genDemoByCode } from './utils';

export function fencePlugin(md: MarkdownRenderer) {
  const defaultRender = md.renderer.rules.fence;

  md.renderer.rules.fence = (tokens, idx, ...args) => {
    const token = tokens[idx];
    if (token.info.trim() !== FenceDemoTag) {
      return defaultRender!(tokens, idx, ...args);
    }

    const content = token.content;
    const path = md.__path;

    const demoScripts = genDemoByCode(md, path, content);
    return demoScripts;
  };
}
