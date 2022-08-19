import { LocaleConfigs } from '@ruabick/utils';
import chokidar from 'chokidar';
import { handleCopy } from './handleCopy';
import { Options } from './types';
import { removeFile } from './utils';
import fg from 'fast-glob';

export async function copyDocs(
  options: Required<Options>,
  localeConfigs: LocaleConfigs,
) {
  const { docsDir, initial } = options;

  const globSource = `${docsDir}/**`;

  const copyFile = (file: string) =>
    handleCopy(docsDir, file, { options, localeConfigs });

  if (initial) {
    const files = await fg(globSource, { dot: true, cwd: process.cwd() });
    await Promise.all(files.map(copyFile));
  } else {
    chokidar
      .watch(globSource, {
        cwd: process.cwd(),
        ignored: [],
        ignoreInitial: !initial,
        persistent: !initial,
      })
      .on('change', copyFile)
      .on('add', copyFile)
      .on('unlink', (file) => removeFile(file));
  }
}
