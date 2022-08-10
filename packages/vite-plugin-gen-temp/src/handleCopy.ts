import { yellow, dim, green } from 'colorette';
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
    await fsExtra.copy(path, destPath);
  } else {
    const { finnalPath, finnalContent } = await resolveFrontmatter(
      path,
      tempDir,
      dir,
    );

    const fileInLangDir = handleLangSuffix(finnalPath, localeConfigs);

    destPath = join(tempDir, fileInLangDir);
    await fsExtra.ensureFile(destPath);
    await fsExtra.writeFile(destPath, finnalContent);
  }

  console.log(`${LOG_PREFIX} ${green('copy')} ${path} → ${destPath}`);
}

async function resolveFrontmatter(path: string, tempDir: string, dir: string) {
  // TODO cache it
  const originalContent = await fsExtra.readFile(path, 'utf-8');
  const { content, data: frontmatter } = matter(originalContent);

  const realPath = path;
  let finnalPath;

  if (frontmatter.map?.path) {
    let mappedPath = frontmatter.map?.path;

    if (!mappedPath.endsWith('.md')) {
      mappedPath = join(mappedPath, basename(path));
    }

    const tempPath = join(tempDir, mappedPath);
    if (fsExtra.existsSync(tempPath)) {
      throw new Error(
        `Trying to copy file:${path} to ${tempPath}, but file:${tempPath} already exists.`,
      );
    }
    finnalPath = mappedPath;
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
