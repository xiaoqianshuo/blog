import { groupThrottle, groupThrottleAsync, throttle, throttleAsync } from './throttle';

/**
 * 基础同步节流函数示例
 */
function throttleExample() {
  const baseThrottle = throttle(
    (args: string) => {
      console.log(`throttle${args}`);
    },
    2000,
    {
      leading: false,
      trailing: true,
    },
  );

  baseThrottle('基础同步节流函数1');
  baseThrottle('基础同步节流函数2');
  baseThrottle('基础同步节流函数3');
}

/**
 * 基础异步节流函数示例
 */
function throttleAsyncExample() {
  const baseThrottleAsync = throttleAsync(
    async (args: string) => {
      console.log(`throttleAsync${args}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟异步操作
    },
    2000,
    {
      leading: false,
      trailing: true,
    },
  );

  baseThrottleAsync('基础异步节流函数1');
  baseThrottleAsync('基础异步节流函数2');
  baseThrottleAsync('基础异步节流函数3');
  baseThrottleAsync('基础异步节流函数4');
}

/**
 * 按 key 分组同步节流函数示例
 */
function groupThrottleExample() {
  // 按 key 分组同步节流函数示例
  const sendRequest = groupThrottle<string, [string]>(
    (userId, action) => {
      console.log(`用户 ${userId} 执行了 ${action} - ${new Date().toISOString()}`);
    },
    2000,
    {
      leading: false,
      trailing: true,
    },
  );

  sendRequest('user1', '点赞1');
  sendRequest('user1', '点赞2');
  sendRequest('user1', '点赞3');
  sendRequest('user1', '点赞4');
  sendRequest('user2', '关注1');
  sendRequest('user2', '关注2');
  sendRequest('user2', '关注3');
}

/**
 * 按 key 分组异步节流函数示例
 */
function groupThrottleAsyncExample() {
  // 按 key 分组异步节流函数示例
  const fetchData = groupThrottleAsync<string, [number]>(
    async (userId, id) => {
      console.log(`用户 ${userId} 请求数据 ${id} - ${new Date().toISOString()}`);
      await new Promise(res => setTimeout(res, 500)); // 模拟异步请求
    },
    2000,
    {
      leading: false,
      trailing: true,
    },
  );

  fetchData('user1', 1);
  fetchData('user1', 2);
  fetchData('user2', 1);
  fetchData('user2', 2);
  fetchData('user2', 3);
}

async function main() {
  throttleExample(); // 基础同步节流函数
  throttleAsyncExample(); // 基础异步节流函数
  groupThrottleExample(); // 按 key 分组同步节流函数
  groupThrottleAsyncExample(); // 按 key 分组异步节流函数
}
main();
