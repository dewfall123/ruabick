import { DemoInfos } from './types';
import fsExtra from 'fs-extra';
import { dirname, join, sep } from 'path';
import { MarkdownRenderer } from 'vitepress';
import { DemoTag } from './constants';

const scriptRE = /<\/script>/;
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/;
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/;
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/;

let index = 1;
export function getDemoComponent(
  md: MarkdownRenderer,
  { title, desc, path, code }: DemoInfos,
) {
  const componentName = `DemoComponent${index++}`;

  path = normalizePath(path);

  injectImportStatement(md, componentName, path);

  const highlightedCode = md.options.highlight!(code, 'vue', '');
  return `
    <${DemoTag}
      code="${encodeURIComponent(code)}"
      highlightedCode="${encodeURIComponent(highlightedCode)}"
      src="${path}"
      title="${title ?? ''}"
      desc="${desc ?? ''}"
    >
        <${componentName}></${componentName}>
    </${DemoTag}>
  `.trim();
}

let fenceIndex = 1;
export function genDemoByCode(
  md: MarkdownRenderer,
  path: string,
  code: string,
) {
  let demoName = '';
  let demoPath = '';

  while (true) {
    demoName = `demo-${fenceIndex++}.vue`;
    demoPath = join(dirname(path), demoName);
    if (!fsExtra.existsSync(demoPath)) {
      break;
    }
  }

  fsExtra.createFileSync(demoPath);
  fsExtra.writeFileSync(demoPath, code);

  return getDemoComponent(md, {
    path: demoPath,
    code,
  });
}

function injectImportStatement(
  md: MarkdownRenderer,
  componentName: string,
  path: string,
) {
  const componentRegistStatement =
    `import ${componentName} from '${path}'`.trim();

  if (!md.__data.hoistedTags) {
    md.__data.hoistedTags = [];
  }
  const tags = md.__data.hoistedTags;

  const isUsingTS = tags.findIndex((tag) => scriptLangTsRE.test(tag)) > -1;
  const existingSetupScriptIndex = tags?.findIndex((tag) => {
    return (
      scriptRE.test(tag) && scriptSetupRE.test(tag) && !scriptClientRE.test(tag)
    );
  });

  if (existingSetupScriptIndex > -1) {
    const tagSrc = tags[existingSetupScriptIndex];
    tags[existingSetupScriptIndex] = tagSrc.replace(
      scriptRE,
      `${componentRegistStatement}

      </script>`,
    );
  } else {
    tags.unshift(
      `
        <script ${isUsingTS ? 'lang="ts"' : ''} setup >
          ${componentRegistStatement}
        </script>
      `.trim(),
    );
  }
}

function normalizePath(path: string) {
  return path.split(sep).join('/');
}
