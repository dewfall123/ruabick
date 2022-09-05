import { Plugin } from 'vite';
import {
  LocaleConfigs,
  parseProps,
  resolveLocaleConfigs,
} from '@ruabick/utils';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter';
import { dirname, resolve } from 'node:path';
import { getApiTmpl } from './getApiTmpl';
import { parse as parseVue } from 'vue-docgen-api';
import parseInterface from './utils/parse-interface';

const API_REG = /^<API (.*)(<\/API>|\/>)$/;
const LOG_PREFIX = '[ruabick:gen-doc-api]';

export function genApiDoc(): Plugin {
  let localeConfigs: LocaleConfigs;
  let md: MarkdownIt;

  return {
    name: 'gen-api-doc',
    enforce: 'pre',
    configResolved: async (config) => {
      localeConfigs = await resolveLocaleConfigs(config.root);
      md = new MarkdownIt('zero');
    },
    transform: async (code, id) => {
      if (!id.endsWith('.md')) {
        return null;
      }

      const { data: frontmatter, content } = matter(code);
      const baseDir = frontmatter.realPath
        ? dirname(frontmatter.realPath)
        : __dirname;

      const blocks = md.parse(content, {}).map((i) => i.content);
      const replacedBlocks: string[] = [];

      for (const block of blocks) {
        if (!block.match(API_REG)) {
          replacedBlocks.push(block);
        } else {
          replacedBlocks.push(
            await getApiMarkdown(block, localeConfigs, baseDir),
          );
        }
      }

      const replacedCode = matter.stringify(replacedBlocks.join('\n'), {
        ...frontmatter,
      });

      return replacedCode;
    },
  };
}

async function getApiMarkdown(
  apiComponent: string,
  localeConfigs: LocaleConfigs,
  baseDir: string,
) {
  const props = parseProps(apiComponent);

  const lang =
    props.lang ?? (localeConfigs.defaultLang.includes('zh') ? 'zh' : 'en');

  if (!props.src) {
    console.error(`${LOG_PREFIX} "${apiComponent}" missing src props.`);
    return apiComponent;
  }

  const srcPath = resolve(baseDir, props.src);

  const componentDoc =
    srcPath.endsWith('.vue') || srcPath.endsWith('.tsx')
      ? await parseVue(srcPath)
      : await parseInterface(srcPath);

  const apiMdContents = await getApiTmpl(componentDoc, 'component', lang);

  return apiMdContents || `${srcPath}'s api is empty!`;
}
