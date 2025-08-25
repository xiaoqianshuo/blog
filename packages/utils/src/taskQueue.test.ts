import { TaskQueue } from './taskQueue';

async function main() {
  // 初始化任务队列 可选任务失败日志输出
  const queue = new TaskQueue({ error: (...args) => console.error('[Logger]', ...args) });

  // 监听任务完成事件
  queue.onTaskCompleted(result => {
    console.log('Task completed:', result);
  });
  // 监听任务成功事件
  queue.onTaskSuccess(result => {
    console.log('Task success:', result);
  });
  // 监听任务失败事件
  queue.onTaskFailed(result => {
    console.log('Task failed:', result);
  });

  // 添加串行任务
  queue.enqueue('user', async () => {
    await new Promise(res => setTimeout(res, 3000));
    return 'user1';
  });
  queue.enqueue('user', async () => {
    await new Promise(res => setTimeout(res, 3000));
    throw new Error('fail!');
  });
  queue.enqueue('user', async () => {
    await new Promise(res => setTimeout(res, 3000));
    return 'user3';
  });

  // 并行不同 key
  queue.enqueue('order', async () => {
    await new Promise(res => setTimeout(res, 3200));
    return 123;
  });

  // 等待所有任务完成
  setTimeout(() => {
    console.log('剩余队列：', queue.getQueueKeys());
  }, 2000);
}

main();
