import { Constructor } from '@xiaoqianshuo/utils/types';
import { singletonFetchRequestAdapter } from '../adapters/fetch.adapter';
import { BaseApi } from '../core/base-api';

/**
 * 依赖注入装饰器
 */
export function Injectable() {
  return function <T extends Constructor<BaseApi>>(Target: T): T {
    return class extends Target {
      constructor(...args: any[]) {
        args[1] = args[1] || singletonFetchRequestAdapter;
        super(...args);
      }
    };
  };
}
