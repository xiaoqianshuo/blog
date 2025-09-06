import { createConfig } from '@xiaoqianshuo/eslint-config';

export default createConfig({
  envs: ['browser'],
  typescript: true,
  vue: {
    jsx: true,
  },
});
