/**
 * 判断当前运行环境是浏览器还是 Node.js
 * @returns 'browser' | 'node'
 */
export function getRuntimeEnv(): 'browser' | 'node' {
  if (
    typeof globalThis !== 'undefined' &&
    typeof globalThis.window !== 'undefined' &&
    typeof globalThis.window.document !== 'undefined'
  ) {
    return 'browser';
  }
  return 'node';
}
