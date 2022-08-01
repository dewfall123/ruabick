import { Options } from './types';

export const TempDir = '.docs';
export const DocsDir = 'docs';
export const SrcDir = 'src';

export const DefaultOptions: Required<Options> = {
  srcDir: SrcDir,
  tempDir: TempDir,
  docsDir: DocsDir,
  initial: false,
  lang: 'zh-CN',
};
