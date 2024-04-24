import { request } from "@umijs/max";

/** 获取日志列表 GET /log/list */
export async function logControllerGetlogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PaginationParams,
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