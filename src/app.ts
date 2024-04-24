// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import type { RequestConfig } from 'umi';
import umiRequest from '@/utils/request';
import 'bytemd/dist/index.css'
import { getToken, getSessionStorageItem } from '@/utils';
import type { InitialStateTypes } from '@/utils/types'

export async function getInitialState(): Promise<InitialStateTypes> {
  const userInfo = getSessionStorageItem<API.User>("userInfo") ?? undefined;
  console.log(userInfo, '==');

  const token = getToken() ?? undefined;
  return { token, userInfo };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};


export const request: RequestConfig = umiRequest;