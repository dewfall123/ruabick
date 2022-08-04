import program from 'commander';
import kolorist from 'kolorist';
import del from 'del';
import { CLI_NAME, pkgFromUserAgent } from './constants';
import { createDir } from './create-dir';
import { generator } from './generator';
import { TEMPLATE_NAME } from './constants';
import { prompt } from './prompt';

export async function cli() {
  program.usage('<project-name>').parse(process.argv);

  const argProjectName = program.args[0];
  // const root = process.cwd();
  let createdFile;
  try {
    const meta = await prompt(argProjectName);

    createdFile = await createDir(meta);

    await generator(meta);

    clean();

    const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
    const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

    console.log(`\n🎉  Successfully created project ${meta.projectName}.`);
    console.log(`👉  Get started with the following commands:\n`);

    console.log(
      `${kolorist.gray('$')} ${kolorist.cyan(`cd ${meta.projectName}`)}`,
    );
    console.log(
      `${kolorist.gray('$')} ${kolorist.cyan(
        `${pkgManager} install && ${pkgManager} dev`,
      )}\n`,
    );
  } catch (err) {
    console.error(err);
    console.warn(`[${CLI_NAME}] failed.`);
    if (createdFile) {
      del(createdFile);
    }
  }

  function clean() {
    del(TEMPLATE_NAME);
  }
}
