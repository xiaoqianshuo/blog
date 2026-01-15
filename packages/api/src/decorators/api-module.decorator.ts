import { BaseApi } from '../core/base-api';
import { Constructor } from '../types';
import { joinMultiplePaths } from '../utils/path';

/**
 * API 模块装饰器
 * @param baseUrl 模块基础 URL
 */
export function ApiModule(baseUrl: string) {
  return function <T extends Constructor<BaseApi>>(target: T): T {
    return class extends target {
      constructor(...args: any[]) {
        args[0] = joinMultiplePaths(args[0], baseUrl);
        super(...args);
      }
    };
  };
}
