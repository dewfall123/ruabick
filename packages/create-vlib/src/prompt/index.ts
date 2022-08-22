import inquirer from 'inquirer';
import { red, reset } from 'kolorist';

export interface Meta {
  projectName: string;
  description: string;
  user: string;
  template: string;
}

export async function prompt(targetDir: string) {
  const defaultTargetDir = 'ruabick-project';

  const questions = [
    {
      type: targetDir ? null : 'text',
      name: 'projectName',
      message: reset('Project name:'),
      initial: defaultTargetDir,
      default: defaultTargetDir,
      onState: (state: any) => {
        targetDir = formatTargetDir(state.value) || defaultTargetDir;
      },
    },
    {
      name: 'template',
      type: 'list',
      message: 'Please select a template.',
      choices: [
        {
          name: 'vue-ts-components',
          value: 'template-vue-ts',
        },
        {
          name: 'ts-library',
          value: 'template-ts',
        },
      ],
    },
    {
      name: 'description',
      message: 'project description',
      default: ``,
    },
    {
      name: 'user',
      message: 'your github user name',
      default: ``,
    },
  ];

  const meta = (await inquirer.prompt(questions, {
    onCancel: () => {
      throw new Error(red('✖') + ' Operation cancelled');
    },
  })) as Meta;

  return meta;
}

function formatTargetDir(targetDir: string) {
  return targetDir?.trim().replace(/\/+$/g, '');
}
