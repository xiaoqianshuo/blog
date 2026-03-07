import { getRuntimeEnv } from './_env';

/**
 * 节流函数配置
 */
interface ThrottleOptions {
  /**
   * 是否首次立即执行，默认 true
   */
  leading?: boolean;
  /**
   * 是否在等待结束时执行最后一次，默认 true
   */
  trailing?: boolean;
}

/**
 * 基础同步节流函数
 * @template Args 参数类型元组
 * @param fn 要节流的函数
 * @param wait 节流间隔（毫秒）
 * @param options 配置项
 * @param options.leading 是否首次立即执行，默认 true
 * @param options.trailing 是否在等待结束时执行最后一次，默认 true
 * @returns 节流后的函数
 */
const throttle = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  wait: number,
  options: ThrottleOptions = { leading: true, trailing: true },
): ((...args: Args) => void) => {
  const { leading = true, trailing = true } = options;

  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastTime = 0;
  let lastArgs: Args | null = null;

  return (...args: Args) => {
    const now = Date.now();
    lastArgs = args;

    const callFn = () => {
      if (lastArgs) {
        fn(...lastArgs);
        lastArgs = null;
        lastTime = Date.now();
      }
    };

    if (!lastTime && !leading) {
      lastTime = now;
    }

    const remaining = wait - (now - lastTime);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (leading || lastTime !== now) {
        callFn();
      }
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        callFn();
        timer = null;
      }, remaining);
    }
  };
};

/**
 * 基础异步节流函数
 * @template Args 参数类型元组
 * @template R 返回值类型
 * @param fn 异步函数
 * @param wait 节流间隔（毫秒）
 * @param options 配置项
 * @param options.leading 是否首次立即执行，默认 true
 * @param options.trailing 是否在等待结束时执行最后一次，默认 true
 * @returns 节流后的异步函数
 */
const throttleAsync = <Args extends unknown[], R = void>(
  fn: (...args: Args) => Promise<R>,
  wait: number,
  options: ThrottleOptions = { leading: true, trailing: true },
): ((...args: Args) => Promise<R>) => {
  const { leading = true, trailing = true } = options;

  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastTime = 0;
  let lastArgs: Args | null = null;
  let pending: ((value: R) => void)[] = [];

  return (...args: Args): Promise<R> =>
    new Promise<R>(resolve => {
      const now = Date.now();
      lastArgs = args;
      pending.push(resolve);

      const callFn = () => {
        if (lastArgs) {
          fn(...lastArgs).then(res => {
            pending.forEach(r => r(res));
            pending = [];
          });
          lastArgs = null;
          lastTime = Date.now();
        }
      };

      if (!lastTime && !leading) {
        lastTime = now;
      }

      const remaining = wait - (now - lastTime);

      if (remaining <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        if (leading || lastTime !== now) {
          callFn();
        }
      } else if (trailing && !timer) {
        timer = setTimeout(() => {
          callFn();
          timer = null;
        }, remaining);
      }
    });
};

/**
 * 按 key 分组同步节流函数
 * @template K key 类型
 * @template Args 参数类型元组
 * @param fn 要节流的函数，接收 key 作为第一个参数
 * @param wait 节流间隔（毫秒）
 * @param options 配置项
 * @param options.leading 是否首次立即执行，默认 true
 * @param options.trailing 是否在等待结束时执行最后一次，默认 true
 * @param maxIdle 未使用 key 最大闲置时间（毫秒，默认 5 分钟）
 * @returns 按 key 分组节流后的函数
 */
const groupThrottle = <K, Args extends unknown[]>(
  fn: (key: K, ...args: Args) => void,
  wait: number,
  options: ThrottleOptions = { leading: true, trailing: true },
  maxIdle = 5 * 60 * 1000,
): ((key: K, ...args: Args) => void) => {
  const throttlers = new Map<K, { throttler: (...args: Args) => void; lastUsed: number }>();

  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, { lastUsed }] of throttlers.entries()) {
      if (now - lastUsed > maxIdle) {
        throttlers.delete(key);
      }
    }
  }, maxIdle);

  // Node.js 环境：不让定时器阻止进程自然退出
  if (typeof (cleanupInterval as unknown as NodeJS.Timeout).unref === 'function') {
    (cleanupInterval as unknown as NodeJS.Timeout).unref();
  }

  if (getRuntimeEnv() === 'browser') {
    window.addEventListener('beforeunload', () => clearInterval(cleanupInterval));
  }

  return (key: K, ...args: Args) => {
    if (!throttlers.has(key)) {
      throttlers.set(key, {
        throttler: throttle<Args>((...innerArgs: Args) => fn(key, ...innerArgs), wait, options),
        lastUsed: Date.now(),
      });
    }

    const entry = throttlers.get(key);
    if (entry) {
      entry.lastUsed = Date.now();
      entry.throttler(...args);
    }
  };
};

/**
 * 按 key 分组异步节流函数
 * @template K key 类型
 * @template Args 参数类型元组
 * @template R 异步返回值类型
 * @param fn 异步函数，接收 key 作为第一个参数
 * @param wait 节流间隔（毫秒）
 * @param options 配置项
 * @param options.leading 是否首次立即执行，默认 true
 * @param options.trailing 是否在等待结束时执行最后一次，默认 true
 * @param maxIdle 未使用 key 最大闲置时间（毫秒，默认 5 分钟）
 * @returns 按 key 分组节流后的异步函数，返回 Promise<R>
 */
const groupThrottleAsync = <K, Args extends unknown[], R = void>(
  fn: (key: K, ...args: Args) => Promise<R>,
  wait: number,
  options: ThrottleOptions = { leading: true, trailing: true },
  maxIdle = 5 * 60 * 1000,
): ((key: K, ...args: Args) => Promise<R>) => {
  const throttlers = new Map<K, { throttler: (...args: Args) => Promise<R>; lastUsed: number }>();

  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, { lastUsed }] of throttlers.entries()) {
      if (now - lastUsed > maxIdle) {
        throttlers.delete(key);
      }
    }
  }, maxIdle);

  // Node.js 环境：不让定时器阻止进程自然退出
  if (typeof (cleanupInterval as unknown as NodeJS.Timeout).unref === 'function') {
    (cleanupInterval as unknown as NodeJS.Timeout).unref();
  }

  if (getRuntimeEnv() === 'browser') {
    window.addEventListener('beforeunload', () => clearInterval(cleanupInterval));
  }

  return (key: K, ...args: Args): Promise<R> => {
    if (!throttlers.has(key)) {
      throttlers.set(key, {
        throttler: throttleAsync<Args, R>(
          (...innerArgs: Args) => fn(key, ...innerArgs),
          wait,
          options,
        ),
        lastUsed: Date.now(),
      });
    }

    const entry = throttlers.get(key);
    if (entry) {
      entry.lastUsed = Date.now();
      return entry.throttler(...args);
    }

    return Promise.reject(new Error('Throttle entry not found'));
  };
};

export { throttle, throttleAsync, groupThrottle, groupThrottleAsync };
