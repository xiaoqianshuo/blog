import type { AnyCustomEvent, AnyEvent, EventEmitter, Listener } from './eventEmitter';
import { createEventEmitter } from './eventEmitter';

/**
 * 任务结果类型，描述队列任务的执行结果。
 * @template T 任务返回值类型
 */
export interface TaskResult<T> {
  /** 队列唯一标识键 */
  key: string;
  /** 任务返回值 */
  returnValue?: T;
  /** 是否成功 */
  success: boolean;
  /** 错误对象 */
  error?: Error;
}

/**
 * 日志接口类型，兼容 Node.js Logger 及浏览器自定义 logger
 */
export interface TaskLogger {
  error?: (...args: unknown[]) => void;
}

/**
 * 通用任务队列管理器，支持浏览器和 Node.js 环境。
 * - 支持任务串行执行，按 key 隔离队列。
 * - 支持事件监听（完成/成功/失败）。
 * - 兼容 Node.js EventEmitter、浏览器 EventTarget 及 Fallback 实现。
 */
export class TaskQueue {
  private readonly queues = new Map<string, Promise<unknown>>();
  private readonly eventEmitter: EventEmitter;

  /**
   * @param logger 可选日志对象，需有 error 方法
   */
  constructor(private readonly logger?: TaskLogger) {
    this.eventEmitter = createEventEmitter();
  }

  /**
   * 将任务加入指定 key 的队列，自动串行执行。
   * @param key 队列唯一标识
   * @param task 要执行的任务函数
   * @returns 当前任务的 Promise
   */
  public enqueue<T>(key: string, task: () => T) {
    const previousTask = this.queues.get(key) || Promise.resolve();
    const currentTask: Promise<T | undefined> = previousTask
      .catch(err => {
        this.logger?.error?.('Task failed', err);
      })
      .then(async () => {
        try {
          const returnValue = await task();
          this.emitTaskCompleted({ key, returnValue, success: true });
          return returnValue;
        } catch (error) {
          this.emitTaskCompleted({
            key,
            success: false,
            error: error instanceof Error ? error : new Error(String(error)),
          });
          return void 0;
        }
      });
    this.queues.set(key, currentTask);
    currentTask.finally(() => {
      if (this.queues.get(key) === currentTask) {
        this.queues.delete(key);
      }
    });
    return currentTask;
  }

  /**
   * 内部方法：触发任务完成/成功/失败事件
   * @param result 任务结果
   */
  private emitTaskCompleted<T>(result: TaskResult<T>) {
    if ('emit' in this.eventEmitter) {
      this.eventEmitter.emit('taskCompleted', result);
      if (result.success) {
        this.eventEmitter.emit('taskSuccess', result);
      } else {
        this.eventEmitter.emit('taskFailed', result);
      }
    }
    if ('dispatchEvent' in this.eventEmitter) {
      const evt = (type: string) =>
        typeof globalThis.CustomEvent === 'function'
          ? new (globalThis.CustomEvent as unknown as new <T>(
              type: string,
              init: { detail: T },
            ) => AnyEvent)(type, { detail: result })
          : ({ type, detail: result } as AnyEvent);
      this.eventEmitter.dispatchEvent(evt('taskCompleted'));
      this.eventEmitter.dispatchEvent(evt(result.success ? 'taskSuccess' : 'taskFailed'));
    }
  }

  /**
   * 监听任务完成事件
   * @param listener 回调函数，参数为任务结果
   */
  public onTaskCompleted<T>(listener: Listener<TaskResult<T>>) {
    if ('on' in this.eventEmitter) {
      this.eventEmitter.on('taskCompleted', listener as (...args: unknown[]) => void);
    } else if ('addEventListener' in this.eventEmitter) {
      this.eventEmitter.addEventListener('taskCompleted', (e: AnyEvent) => {
        const detail = (e as AnyCustomEvent).detail ?? (e as { detail?: unknown }).detail;
        listener(detail as TaskResult<T>);
      });
    }
  }

  /**
   * 监听任务成功事件
   * @param listener 回调函数，参数为任务结果
   */
  public onTaskSuccess<T>(listener: Listener<TaskResult<T>>) {
    if ('on' in this.eventEmitter) {
      this.eventEmitter.on('taskSuccess', listener as (...args: unknown[]) => void);
    } else if ('addEventListener' in this.eventEmitter) {
      this.eventEmitter.addEventListener('taskSuccess', (e: AnyEvent) => {
        const detail = (e as AnyCustomEvent).detail ?? (e as { detail?: unknown }).detail;
        listener(detail as TaskResult<T>);
      });
    }
  }

  /**
   * 监听任务失败事件
   * @param listener 回调函数，参数为任务结果
   */
  public onTaskFailed(listener: Listener<TaskResult<unknown>>) {
    if ('on' in this.eventEmitter) {
      this.eventEmitter.on('taskFailed', listener as (...args: unknown[]) => void);
    } else if ('addEventListener' in this.eventEmitter) {
      this.eventEmitter.addEventListener('taskFailed', (e: AnyEvent) => {
        const detail = (e as AnyCustomEvent).detail ?? (e as { detail?: unknown }).detail;
        listener(detail as TaskResult<unknown>);
      });
    }
  }

  /**
   * 取消事件监听
   * @param event 事件名
   * @param listener 监听函数
   */
  public off(event: 'taskCompleted' | 'taskSuccess' | 'taskFailed', listener: Listener) {
    if ('off' in this.eventEmitter) {
      this.eventEmitter.off(event, listener as (...args: unknown[]) => void);
    } else if ('removeEventListener' in this.eventEmitter) {
      this.eventEmitter.removeEventListener(event, listener as (e: AnyEvent) => void);
    }
  }

  /**
   * 判断指定 key 是否有未完成的任务
   * @param key 队列唯一标识
   */
  public hasTasks(key: string): boolean {
    return this.queues.has(key);
  }

  /**
   * 获取所有队列 key
   */
  public getQueueKeys(): string[] {
    return Array.from(this.queues.keys());
  }
}
