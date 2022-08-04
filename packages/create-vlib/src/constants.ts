export const CLI_NAME = 'create-vlib';
export const TEMPLATE_NAME = './temp';

export function pkgFromUserAgent(userAgent?: string) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}
