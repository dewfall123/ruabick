import { src, dest } from 'gulp';
import replace from 'gulp-replace';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Meta } from '../prompt';

export async function generator(meta: Meta) {
  console.log(meta.template);
  const templateDir = resolve(
    // @ts-ignore
    fileURLToPath(import.meta.url),
    '../..',
    meta.template,
  );

  return new Promise((resolve, reject) => {
    src([`${templateDir}/**/**`, '!node_modules'], { dot: true })
      .pipe(replace('@{projectName}', meta.projectName))
      .pipe(replace('@{description}', meta.description))
      .pipe(replace('@{user}', meta.user))
      .pipe(dest(meta.projectName))
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        resolve(true);
      });
  });
}
