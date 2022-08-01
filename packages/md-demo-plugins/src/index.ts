import { demoBlockPlugin } from './plugin-demo-block';
import { fencePlugin } from './plugin-fence';

export function applyPlugins(md: any) {
  md.use(fencePlugin);
  md.use(demoBlockPlugin);
}

export * from './constants';
