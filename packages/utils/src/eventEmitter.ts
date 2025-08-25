import { getRuntimeEnv } from './_env';

/**
 * 事件监听函数类型
 * @template T 事件数据类型
 */
export type Listener<T = unknown> = (result: T) => void;

/**
 * Node.js EventEmitter 类型声明（仅类型，不引入实现，避免打包进浏览器）
 */
export interface NodeEventEmitter {
  emit(event: string, ...args: unknown[]): void;
  on(event: string, listener: (...args: unknown[]) => void): void;
  off(event: string, listener: (...args: unknown[]) => void): void;
  setMaxListeners?(n: number): void;
}

/**
 * 兼容 Event/CustomEvent 类型声明（避免全局依赖）
 */
export interface AnyEvent {
  type: string;
  detail?: unknown;
}
export interface AnyCustomEvent {
  type: string;
  detail: unknown;
}

/**
 * 浏览器端事件系统类型声明
 */
export interface BrowserEventTarget {
  addEventListener(type: string, listener: (e: AnyEvent) => void): void;
  removeEventListener(type: string, listener: (e: AnyEvent) => void): void;
  dispatchEvent(event: AnyEvent): boolean;
}

/**
 * 简单事件系统类型声明（仅 Fallback 使用）
 */
export interface SimpleEventEmitter {
  listeners: Record<string, Listener[]>;
  emit(event: string, ...args: unknown[]): void;
  on(event: string, fn: Listener): void;
  off(event: string, fn: Listener): void;
}

export type EventEmitter = NodeEventEmitter | BrowserEventTarget | SimpleEventEmitter;

/**
 * 事件系统工厂，自动根据运行环境选择合适的事件实现。
 * @returns NodeEventEmitter | BrowserEventTarget | SimpleEventEmitter
 */
export function createEventEmitter(): EventEmitter {
  const env = getRuntimeEnv();
  if (
    env === 'node' &&
    typeof (globalThis as Record<string, unknown>).EventEmitter !== 'undefined'
  ) {
    const emitterCtor = (globalThis as Record<string, unknown>).EventEmitter as
      | (new () => NodeEventEmitter)
      | undefined;
    if (emitterCtor) {
      const emitter = new emitterCtor();
      if (typeof emitter.setMaxListeners === 'function') {
        emitter.setMaxListeners(100);
      }
      return emitter;
    }
  }
  if (
    env === 'browser' &&
    typeof (globalThis as Record<string, unknown>).EventTarget !== 'undefined'
  ) {
    const eventTargetCtor = (globalThis as Record<string, unknown>).EventTarget as
      | (new () => BrowserEventTarget)
      | undefined;
    if (eventTargetCtor) {
      return new eventTargetCtor();
    }
  }
  // Fallback: 简单事件系统
  const listeners: Record<string, Listener[]> = {};
  return {
    listeners,
    emit(event: string, result: unknown) {
      (listeners[event] || []).forEach((fn: Listener) => fn(result));
    },
    on(event: string, fn: Listener) {
      (listeners[event] = listeners[event] || []).push(fn);
    },
    off(event: string, fn: Listener) {
      listeners[event] = (listeners[event] || []).filter(f => f !== fn);
    },
  };
}
