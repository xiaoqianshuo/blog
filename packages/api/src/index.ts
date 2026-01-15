// 引入 reflect-metadata 库，用于装饰器元数据存储
import 'reflect-metadata';

import { generateApiClient } from './core/api-client';
import { RequestAdapter, RequestConfig } from './adapters/request.adapter';
import { Injectable } from './decorators/di.decorator';
import { ApiModule } from './decorators/api-module.decorator';
import { BaseApi } from './core/base-api';

export { generateApiClient, RequestAdapter, Injectable, ApiModule, BaseApi };
