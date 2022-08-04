import { TEMPLATES, TEMPLATE_NAME } from '../constants';
import downloadGitRepo from 'download-git-repo';
import ora from 'ora';
import { log } from '../utils';
import { Meta } from '../prompt';
import { promisify } from 'util';

export async function download(meta: Meta) {
    const item = TEMPLATES.find((i) => i.value === meta.mode)!;
    const gitUrl = item.git;

    const spinner = ora(`Downloading template from ${gitUrl}...`);

    spinner.start();
    try {
        const down = promisify(downloadGitRepo);
        await down(`direct:${gitUrl}`, `${TEMPLATE_NAME}`, {
            clone: true,
            allowEmpty: true,
        });
        spinner.succeed();
    } catch (err) {
        spinner.fail();
        log.error(err);
        const msg = 'template download failed.';
        throw new Error(msg);
    }
}
