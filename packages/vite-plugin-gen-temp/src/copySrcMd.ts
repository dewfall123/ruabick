import { LocaleConfigs } from '@ruabick/utils';
import chokidar from 'chokidar';
import { handleCopy } from './handleCopy';
import { Options } from './types';
import { removeFile } from './utils';
import fg from 'fast-glob';

export async function copySrcMd(
  options: Required<Options>,
  localeConfigs: LocaleConfigs,
) {
  const { srcDir, initial } = options;

  const copyFile = (file: string) =>
    handleCopy(srcDir, file, { options, localeConfigs });

  const globSource = `${srcDir}/**/*.md`;

  if (initial) {
    const mdFiles = await fg(globSource, {
      dot: true,
      cwd: process.cwd(),
      ignore: ['**/node_modules/**'],
    });
    await Promise.all(mdFiles.map(copyFile));
  } else {
    chokidar
      .watch(globSource, {
        cwd: process.cwd(),
        ignored: [/node_modules/],
        ignoreInitial: true,
      })
      .on('change', copyFile)
      .on('add', copyFile)
      .on('unlink', (file) => removeFile(file));
  }
}
