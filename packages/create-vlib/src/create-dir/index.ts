import globby from 'globby';
import { mkdirSync } from 'fs';
import { Meta } from '../prompt';

async function checkDir(name: string) {
  const list = await globby('*', { onlyDirectories: true });
  if (list.includes(name)) {
    const msg = `Directory ${name} already exists.`;
    console.error(msg);
    throw new Error(msg);
  }
}

export async function createDir(meta: Meta) {
  await checkDir(meta.projectName);

  await mkdirSync(meta.projectName);

  return meta.projectName;
}
