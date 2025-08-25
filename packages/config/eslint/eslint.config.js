import { createConfig } from '@xiaoqianshuo/eslint-config';

export default createConfig({
  envs: ['node', 'browser'],
  typescript: true,
  vue: false,
  react: false,
});
