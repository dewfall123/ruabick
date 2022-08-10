import { LocaleConfigs } from '@ruabick/utils';
import chokidar from 'chokidar';
import { handleCopy } from './handleCopy';
import { Options } from './types';
import { removeFile } from './utils';

export async function copyDocs(
  options: Required<Options>,
  localeConfigs: LocaleConfigs,
) {
  const { docsDir, initial } = options;

  const copyFile = (file: string) =>
    handleCopy(docsDir, file, { options, localeConfigs });

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
