import { LocaleConfigs } from '@ruabick/utils';
import chokidar from 'chokidar';
import { handleCopy } from './handleCopy';
import { Options } from './types';
import { removeFile } from './utils';

export async function copySrcMd(
  options: Required<Options>,
  localeConfigs: LocaleConfigs,
) {
  const { srcDir, initial } = options;

  const tasks: Promise<any>[] = [];
  const copyFile = async (file: string) =>
    tasks.push(handleCopy(srcDir, file, { options, localeConfigs }));

  return new Promise((resolve) => {
    chokidar
      .watch(`${srcDir}/**/*.md`, {
        cwd: process.cwd(),
        ignored: [],
        ignoreInitial: !initial,
        persistent: !initial,
      })
      .on('change', copyFile)
      .on('add', copyFile)
      .on('unlink', (file) => removeFile(file))
      .on('ready', async () => {
        await Promise.all(tasks);
        resolve(true);
      });
  });
}
