// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /swagger-json */
export async function swaggerControllerGetSwaggerJson(options?: { [key: string]: any }) {
  return request<any>('/swagger-json', {
    method: 'GET',
    ...(options || {}),
  });
}
