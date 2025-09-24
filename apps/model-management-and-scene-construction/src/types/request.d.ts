/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-23 17:14:06
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-06-25 09:55:30
 * @Description : request类型声明
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { MockAdapter } from 'axios-mock-adapter'

// 定义 createRequestFunction 函数的返回类型
type RequestFunction = <T>(config: AxiosRequestConfig) => Promise<T>

// 定义 createRequestFunction 函数类型
type CreateRequestFunction = (service: AxiosInstance) => RequestFunction


// 直接为 request 和 requestForMock 定义类型
export const request: RequestFunction
export const requestForMock: RequestFunction

// 假设 Tools 类型，实际使用时按需调整
type ToolsType = {
  parse: (data: string) => object;
  responseSuccess: (data: object, message?: string) => [number, object];
  responseError: (data: object, message: string) => [number, object];
};

// 定义箭头函数参数类型
type ApiModuleParams = {
  request: RequestFunction;
  requestForMock: RequestFunction;
  mock: MockAdapter;
  tools: ToolsType;
};


// 导出相关类型
export type { RequestFunction, CreateRequestFunction, ApiModuleParams, ToolsType, MockType }
