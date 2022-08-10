import { dirname, resolve } from 'path';
import { MarkdownRenderer } from 'vitepress';
import { parseProps } from '@ruabick/utils';
import { DemoTag } from './constants';
import { getDemoComponent } from './utils';
import fsExtra from 'fs-extra';
import matter from 'gray-matter';

export function demoBlockPlugin(md: MarkdownRenderer) {
  const defaultRender = md.renderer.rules.html_block;

  md.renderer.rules.html_block = (tokens, idx, ...args) => {
    const token = tokens[idx];
    const content = token.content.trim();

    if (!content.startsWith(`<${DemoTag} `)) {
      return defaultRender!(tokens, idx, ...args);
    }

    const props = parseProps(content);

    if (!props.src) {
      console.error(`miss src props in ${md.__path} demo.`);
      return defaultRender!(tokens, idx, ...args);
    }

    // TODO issue  get frontmatter from md.__frontmatter
    const mdContent = fsExtra.readFileSync(md.__path);
    const { data: frontmatter } = matter(mdContent);

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
}
