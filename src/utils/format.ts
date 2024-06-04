import type { PageResponse, Response } from '@/utils/types'
import { isSuccess } from '@/utils'
import { compact, get, join, startsWith } from 'lodash';
import type { RequestData } from '@ant-design/pro-components';
import { createFromIconfontCN } from '@ant-design/icons';

/**
 * @description: 将 pathname 转成国际化对应的 key，如：/administrative/jobs-management => administrative.jobs-management
 * @author: laoyang
 */
export const formatPathName = (pathname: string): string => {
  return join(compact(pathname.split('/')), '.')
}

/**
 * @description: 格式化请求数据
 * @author: laoyang
 */
export const formatResponse = <T extends any[]>(
  response: Response<T> |
    Response<PageResponse<T[number]>>): RequestData<T[number]> => {
  // 解构响应值
  const { code, data } = response
  return {
    data: get(data, 'list') || get(response, 'data') || [],
    // success 请返回 true，不然 table 会停止解析数据，即使有数据
    success: isSuccess(code),
    total: get(data, 'total', 0),
  }
}

/**
 * @description: 统一国际化前缀
 * @param {boolean} isMenu
 * @Author: laoyang
 */
export const formatPerfix = (route: string, suffix = '', isMenu = false): string => {
  // 国际化字符串
  const field = `${isMenu ? 'menu' : 'pages'}.${formatPathName(route)}${suffix ? '.' + suffix : ''}`
  return startsWith(route, 'global') ? route : field
}


export const IconFont = createFromIconfontCN({
  scriptUrl: process.env.ICONFONT_URL,
});