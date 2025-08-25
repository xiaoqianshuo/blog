import { error } from 'console';
import { TaskQueue } from '../src/taskQueue';

describe('TaskQueue', () => {
  let queue: TaskQueue;

  beforeEach(() => {
    queue = new TaskQueue({ error: (...args) => error('[Logger]', ...args) });
  });

  it('should process tasks in serial for same key and emit success/failed events', async () => {
    const results: string[] = [];
    const successes: string[] = [];
    const failures: string[] = [];

    queue.onTaskCompleted<string>(result => results.push(result.key));
    queue.onTaskSuccess<string>(result => successes.push(String(result.returnValue)));
    queue.onTaskFailed(result => failures.push(String(result.error?.message || result.error)));

    // 串行任务 (同一个 key: user)
    queue.enqueue('user', async () => {
      await new Promise(res => setTimeout(res, 300));
      return 'user1';
    });
    queue.enqueue('user', async () => {
      await new Promise(res => setTimeout(res, 300));
      throw new Error('fail!!');
    });
    queue.enqueue('user', async () => {
      await new Promise(res => setTimeout(res, 300));
      return 'user3';
    });

    // 并行任务 (不同 key: order)
    queue.enqueue('order', async () => {
      await new Promise(res => setTimeout(res, 320));
      return 123;
    });

    // 等待所有任务执行完成
    await new Promise(res => setTimeout(res, 1500));

    // 断言
    expect(results).toEqual(['user', 'order', 'user', 'user']);
    expect(successes).toContain('user1');
    expect(successes).toContain('user3');
    expect(failures).toContain('fail!!');
    expect(successes).toContain('123'); // order 的结果
    expect(results.length).toBe(4);

    // 队列应为空
    expect(queue.getQueueKeys().length).toBe(0);
  });
});
