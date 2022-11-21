import { dirname, resolve } from 'path';
import { MarkdownRenderer } from 'vitepress';
import { baseParse, ElementNode, AttributeNode } from '@vue/compiler-core';
import { ApiTag } from './constants';
import fsExtra from 'fs-extra';
import matter from 'gray-matter';
import { getApiTmpl } from './getApiTmpl';
import { parseSource } from 'vue-docgen-api';

export function demoBlockPlugin(md: MarkdownRenderer) {
  const defaultRender = md.renderer.rules.html_block;

  md.renderer.rules.html_block = (tokens, idx, ...args) => {
    const token = tokens[idx];
    const content = token.content.trim();

    if (!content.match(new RegExp(`^<${ApiTag}\\s`))) {
      return defaultRender!(tokens, idx, ...args);
    }

    const ast = baseParse(content);
    const demoElement = ast.children[0] as ElementNode;

    const props = getPropsMap(demoElement.props as AttributeNode[]);

    if (!props.src) {
      console.error(`miss src props in ${md.__path} demo.`);
      return defaultRender!(tokens, idx, ...args);
    }

    // TODO issue  get frontmatter from md.__frontmatter
    const mdContent = fsExtra.readFileSync(md.__path);
    const { data: frontmatter } = matter(mdContent);

    const mdDir = dirname(frontmatter.realPath ?? md.__path);
    const srcPath = resolve(mdDir, props.src);

    const code = fsExtra.readFileSync(srcPath);
    const componentDoc = parseSource(code, srcPath);
    const apiTmpl = getApiTmpl(componentDoc, 'component', 'zh');

    return apiTmpl;
  };
}

function getPropsMap(attrs: AttributeNode[]) {
  const map: Record<string, string | undefined> = {};
  for (const { name, value } of attrs) {
    map[name] = value?.content;
  }
  return map;
}
