// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取操作日志列表 GET /logs/list */
export async function logsControllerGetLogss(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogsControllerGetLogssParams,
  options?: { [key: string]: any },
) {
  return request<any>('/logs/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
