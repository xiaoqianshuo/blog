import { throttle, throttleAsync, groupThrottle, groupThrottleAsync } from '../src/throttle';

type FnType = 'throttle' | 'throttleAsync' | 'groupThrottle' | 'groupThrottleAsync';

interface Case {
  fnType: FnType;
  leading: boolean;
  trailing: boolean;
  description: string;
}

const cases: Case[] = [
  // 同步节流
  { fnType: 'throttle', leading: true, trailing: true, description: 'leading=true, trailing=true' },
  {
    fnType: 'throttle',
    leading: true,
    trailing: false,
    description: 'leading=true, trailing=false',
  },
  {
    fnType: 'throttle',
    leading: false,
    trailing: true,
    description: 'leading=false, trailing=true',
  },
  {
    fnType: 'throttle',
    leading: false,
    trailing: false,
    description: 'leading=false, trailing=false',
  },
  // 异步节流
  {
    fnType: 'throttleAsync',
    leading: true,
    trailing: true,
    description: 'async leading=true, trailing=true',
  },
  {
    fnType: 'throttleAsync',
    leading: true,
    trailing: false,
    description: 'async leading=true, trailing=false',
  },
  {
    fnType: 'throttleAsync',
    leading: false,
    trailing: true,
    description: 'async leading=false, trailing=true',
  },
  {
    fnType: 'throttleAsync',
    leading: false,
    trailing: false,
    description: 'async leading=false, trailing=false',
  },
  // 分组节流
  {
    fnType: 'groupThrottle',
    leading: true,
    trailing: true,
    description: 'group leading=true, trailing=true',
  },
  {
    fnType: 'groupThrottle',
    leading: true,
    trailing: false,
    description: 'group leading=true, trailing=false',
  },
  {
    fnType: 'groupThrottle',
    leading: false,
    trailing: true,
    description: 'group leading=false, trailing=true',
  },
  {
    fnType: 'groupThrottle',
    leading: false,
    trailing: false,
    description: 'group leading=false, trailing=false',
  },
  // 分组异步节流
  {
    fnType: 'groupThrottleAsync',
    leading: true,
    trailing: true,
    description: 'group async leading=true, trailing=true',
  },
  {
    fnType: 'groupThrottleAsync',
    leading: true,
    trailing: false,
    description: 'group async leading=true, trailing=false',
  },
  {
    fnType: 'groupThrottleAsync',
    leading: false,
    trailing: true,
    description: 'group async leading=false, trailing=true',
  },
  {
    fnType: 'groupThrottleAsync',
    leading: false,
    trailing: false,
    description: 'group async leading=false, trailing=false',
  },
];

describe('throttle family (table-driven)', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const WAIT = 100;

  cases.forEach(({ fnType, leading, trailing, description }) => {
    it(`${fnType}: ${description}`, async () => {
      let fn: any;
      if (fnType.includes('Async')) {
        fn = jest.fn(async (...args: any[]) => args);
      } else {
        fn = jest.fn((..._args: any[]) => {
          //
        });
      }

      let throttled: any;
      if (fnType === 'throttle') {
        throttled = throttle(fn, WAIT, { leading, trailing });
      } else if (fnType === 'throttleAsync') {
        throttled = throttleAsync(fn, WAIT, { leading, trailing });
      } else if (fnType === 'groupThrottle') {
        throttled = groupThrottle(fn, WAIT, { leading, trailing });
      } else if (fnType === 'groupThrottleAsync') {
        throttled = groupThrottleAsync(fn, WAIT, { leading, trailing });
      }

      // 第一次调用
      if (fnType.startsWith('group')) {
        throttled('key1', 'first');
      } else {
        throttled('first');
      }

      if (leading) {
        expect(fn).toHaveBeenCalledTimes(1);
      } else {
        expect(fn).toHaveBeenCalledTimes(0);
      }

      // 第二次调用（50ms 内）
      if (fnType.startsWith('group')) {
        throttled('key1', 'second');
      } else {
        throttled('second');
      }
      jest.advanceTimersByTime(50);

      // 再推进到 WAIT
      jest.advanceTimersByTime(50);

      if (trailing) {
        // trailing=true → 应该再执行一次
        expect(fn).toHaveBeenCalled();
      } else {
        // trailing=false → 不会再执行
        expect(fn).toHaveBeenCalledTimes(leading ? 1 : 0);
      }

      // -------- 异步返回值检查 --------
      if (fnType.includes('Async')) {
        let result: Promise<any>;
        if (fnType.startsWith('group')) {
          result = throttled('key2', 'xxx');
        } else {
          result = throttled('yyy');
        }

        if (leading || trailing) {
          // 至少有一次执行
          jest.advanceTimersByTime(WAIT);
          await expect(result).resolves.toBeDefined();
        } else {
          // leading=false, trailing=false → 永远不会执行
          // 只断言返回的是 Promise，不 await 避免卡死
          expect(result).toBeInstanceOf(Promise);
        }
      }
    });
  });
});

describe('groupThrottle key isolation', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('different keys should not block each other', () => {
    const fn = jest.fn();
    const throttled = groupThrottle(fn, 100);

    throttled('A', 1);
    throttled('B', 2);

    expect(fn).toHaveBeenCalledTimes(2); // key A 和 key B 各自立即执行
  });
});

describe('groupThrottleAsync key isolation', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('different keys async should not block each other', async () => {
    const fn = jest.fn(async (key, val) => `${key}-${val}`);
    const throttled = groupThrottleAsync(fn, 100);

    const p1 = throttled('X', 1);
    const p2 = throttled('Y', 2);

    await expect(p1).resolves.toBe('X-1');
    await expect(p2).resolves.toBe('Y-2');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('maxIdle cleanup (smoke test)', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('should cleanup idle keys', () => {
    const fn = jest.fn();
    const throttled = groupThrottle(fn, 100, {}, 200); // maxIdle=200ms

    throttled('Z', 123);
    expect(fn).toHaveBeenCalledTimes(1);

    // 过了 300ms (超过 maxIdle)
    jest.advanceTimersByTime(300);

    // 再次调用，应该相当于全新 key
    throttled('Z', 456);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
