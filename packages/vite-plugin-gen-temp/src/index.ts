import { Options } from './types';
import { copyDocs } from './copyDocs';
import { copySrcMd } from './copySrcMd';
import { DefaultOptions } from './constants';
import fsExtra from 'fs-extra';
import { cyan } from 'colorette';
import minimist from 'minimist';
import { resolveLocaleConfigs } from '@ruabick/utils';

async function genTempDocs(root: string, inputOptions: Options) {
  const options = {
    ...DefaultOptions,
    ...inputOptions,
  };

  const localeConfigs = await resolveLocaleConfigs(options.docsDir);

  if (options.initial) {
    await fsExtra.remove(options.tempDir);
  }

  await Promise.all([
    copyDocs(options, localeConfigs),
    copySrcMd(options, localeConfigs),
  ]);

  if (options.initial) {
    console.log(`${cyan('Initial scan complete.')}`);
    process.exit(0);
  } else {
    console.warn(
      `${cyan(
        `watching ${options.docsDir} and ${options.srcDir}/**/*.md files changes...`,
      )}`,
    );
  }
}

export async function initialScan() {
  const argv: any = minimist(process.argv.slice(2));

  const root = argv._[0];
  genTempDocs(root, { initial: true });
}

// vite-plugin
export function genTemp() {
  return {
    name: 'vite-plugin-gen-temp',
    config: async (config: any) => {
      await genTempDocs(config.root, { initial: false });
    },
  };
}