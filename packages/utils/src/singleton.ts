import type { Constructor } from './types';

/**
 * 单例模式
 * @description 通过代理实现单例模式，确保一个类只有一个实例，并提供一个全局访问点。
 * @param fn 需要实现单例模式的类的构造函数
 * @returns 一个函数，调用该函数会返回单例实例
 * @example
 * class MyClass {
 *   constructor() {
 *     console.log('MyClass instance created');
 *   }
 * }
 *
 * const SingletonMyClass = singleton(MyClass);
 *
 * const instance1 = new SingletonMyClass(); // 输出: MyClass instance created
 * const instance2 = new SingletonMyClass(); // 不输出任何内容
 *
 * console.log(instance1 === instance2); // 输出: true
 */
export function singleton<T>(fn: Constructor<T>): Constructor<T> {
  let instance: T;
  const proxy = new Proxy(fn, {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args);
      }
      return instance as object;
    },
  });
  fn.prototype.constructor = proxy;
  return proxy;
}
