import { RequestAdapter, RequestConfig } from './request.adapter';

/**
 * Fetch 适配器：实现通用请求接口，适配 Fetch API
 */
export class FetchRequestAdapter extends RequestAdapter {
  // 实现通用请求方法，转换配置和响应格式
  async request<T>(config: RequestConfig<T>): Promise<T> {
    const response: Response = await fetch(
      `${config.url}${config.params ? `?${new URLSearchParams(config.params).toString()}` : ''}`,
      {
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
        body: config.data ? JSON.stringify(config.data) : undefined,
      },
    );
    return response.json();
  }
}
