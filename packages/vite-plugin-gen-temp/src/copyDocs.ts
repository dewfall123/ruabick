import chokidar from 'chokidar';
import { SiteConfig } from 'vitepress';
import { resolveLocales, handleCopy } from './handleCopy';
import { Options } from './types';
import { removeFile } from './utils';

export async function copyDocs(
  options: Required<Options>,
  vitepressConfigs: SiteConfig,
) {
  const { docsDir, initial } = options;

  const { defaultLang, langToPathMap } = resolveLocales(vitepressConfigs);

  const copyFile = (file: string) =>
    handleCopy(docsDir, file, { options, defaultLang, langToPathMap });

  return new Promise((resolve) => {
    chokidar
      .watch(`${docsDir}/**`, {
        cwd: process.cwd(),
        ignored: [],
        ignoreInitial: !initial,
      })
      .on('change', copyFile)
      .on('add', copyFile)
      .on('unlink', (file) => removeFile(file))
      .on('ready', () => resolve(true));
  });
}
