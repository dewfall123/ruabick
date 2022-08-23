import { yellow, dim, green, red } from 'colorette';
import { basename, dirname, extname, join } from 'path';
import { Options } from './types';
import matter from 'gray-matter';
import fsExtra from 'fs-extra';
import { LOG_PREFIX } from './utils';
import { LocaleConfigs } from '@ruabick/utils';

export async function handleCopy(
  dir: string,
  path: string,
  {
    options,
    localeConfigs,
  }: {
    options: Required<Options>;
    localeConfigs: LocaleConfigs;
  },
) {
  const { tempDir } = options;

  let destPath;
  if (!path.endsWith('.md')) {
    destPath = join(tempDir, path.replace(new RegExp(`^${dir}`), ''));
    if (!(await checkDestFileExist(path, destPath))) {
      return;
    }
    await fsExtra.copy(path, destPath);
  } else {
    const { finnalPath, finnalContent } = await resolveFrontmatter(
      path,
      tempDir,
      dir,
    );

    const fileInLangDir = handleLangSuffix(finnalPath, localeConfigs);

    destPath = join(tempDir, fileInLangDir);
    if (!(await checkDestFileExist(path, destPath))) {
      return;
    }
    await fsExtra.ensureFile(destPath);
    await fsExtra.writeFile(destPath, finnalContent);
  }

  console.log(`${LOG_PREFIX} ${green('copy')} ${path} → ${destPath}`);
}

const checkDestFileExist = async (path: string, destPath) => {
  const exist = await fsExtra.pathExists(destPath);
  if (exist) {
    console.error(
      `${LOG_PREFIX} Error: ${red(
        `Trying to copy "${yellow(path)}" to "${yellow(
          destPath,
        )}", but "${yellow(destPath)}" already exists.`,
      )}`,
    );
  }
  return !exist;
};

async function resolveFrontmatter(path: string, tempDir: string, dir: string) {
  // TODO cache it
  const originalContent = await fsExtra.readFile(path, 'utf-8');
  const { content, data: frontmatter } = matter(originalContent);

  const realPath = path;
  let finnalPath;
  let mappingPath = frontmatter.mapping?.path ?? frontmatter.map?.path;

  if (mappingPath) {
    if (!mappingPath.endsWith('.md')) {
      mappingPath = join(mappingPath, basename(path));
    }
    finnalPath = mappingPath;
  } else {
    finnalPath = path.replace(new RegExp(`^${dir}`), '');
  }

  const finnalContent = matter.stringify(content, {
    ...(frontmatter ?? {}),
    realPath,
  });

  return {
    finnalPath,
    finnalContent,
  };
}

function handleLangSuffix(path: string, localeConfigs: LocaleConfigs) {
  const fileName = basename(path);
  const dir = dirname(path);
  const fileNameWithoutMd = fileName.replace(/\.md$/, '');

  const { defaultLang, langToPathMap } = localeConfigs;

  const fileExtname = extname(fileNameWithoutMd);
  const langSuffix = fileExtname.slice(1) || defaultLang;

  const langPath = langToPathMap[langSuffix];
  if (!langPath) {
    console.log(
      yellow(
        `${fileName} has a ${fileExtname} suffix. But ${langSuffix} not defined in locales`,
      ) + dim(` .vitepress.config.js`),
    );
    return path;
  }

  const fileNameWithoutLangSuffix =
    fileNameWithoutMd.slice(0, -fileExtname.length || undefined) + '.md';

  return join(langPath, dir, fileNameWithoutLangSuffix);
}
