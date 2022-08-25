import { dirname, resolve } from 'path';
import { MarkdownRenderer } from 'vitepress';
import { parseProps } from '@ruabick/utils';
import { DemoTag } from './constants';
import { getDemoComponent } from './utils';
import fsExtra from 'fs-extra';

export function demoBlockPlugin(md: MarkdownRenderer) {
  const addRenderRule = (type: string) => {
    const defaultRender = md.renderer.rules[type];

    md.renderer.rules[type] = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const content = token.content.trim();

      if (!content.startsWith(`<${DemoTag} `)) {
        return defaultRender!(tokens, idx, options, env, self);
      }

      const props = parseProps(content);

      if (!props.src) {
        console.error(`miss src props in ${md.__path} demo.`);
        return defaultRender!(tokens, idx, options, env, self);
      }

      const frontmatter = env.frontmatter;

      const mdDir = dirname(frontmatter.realPath ?? md.__path);
      const srcPath = resolve(mdDir, props.src);
      const code = fsExtra.readFileSync(srcPath, 'utf-8');

      const demoScripts = getDemoComponent(md, {
        title: props.title,
        desc: props.desc,
        path: srcPath,
        code,
      });

      return demoScripts;
    };
  };

  addRenderRule('html_block');
  addRenderRule('html_inline');
}
