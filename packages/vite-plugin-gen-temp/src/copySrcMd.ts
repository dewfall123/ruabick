import chokidar from 'chokidar';
import { SiteConfig } from 'vitepress';
import { handleCopy, resolveLocales } from './handleCopy';
import { Options } from './types';
import { removeFile } from './utils';

export async function copySrcMd(
  options: Required<Options>,
  vitepressConfigs: SiteConfig,
) {
  const { srcDir, initial } = options;

  const { defaultLang, langToPathMap } = resolveLocales(vitepressConfigs);

  const copyFile = (file: string) =>
    handleCopy(srcDir, file, { options, defaultLang, langToPathMap });

  return new Promise((resolve) => {
    chokidar
      .watch(`${srcDir}/**/*.md`, {
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
