// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import type { RequestConfig } from 'umi';
import { Navigate } from 'umi';
import umiRequest from '@/utils/request';
import 'bytemd/dist/index.css'
import { getToken, getSessionStorageItem } from '@/utils';
import { parseRoutes, formatRoute } from '@/utils/route';
import type { InitialStateTypes } from '@/utils/types'
import { menuControllerGetSelMenuList as queryMenuList } from '@/services/api/caidanguanli'
import { RunTimeLayoutConfig, history, InitDataType } from '@umijs/max';
import { eq, assign } from 'lodash';
import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary'
import { Result } from 'antd';
import { staticRoutes } from './routes/routes'
export async function getInitialState(): Promise<InitialStateTypes> {
  const userInfo = getSessionStorageItem<API.User>("userInfo") ?? undefined;
  const token = getToken() ?? undefined;
  // 初始化数据
  const initialState: InitialStateTypes = {
    token,
    userInfo
  }
  // 判断在登录页是否已登录，已登录则跳转主页
  if (eq(location.pathname, '/login') && token) {
    history.push('/');
  }

  // 如果不是登录页面，执行
  if (!eq(location.pathname, '/login')) {
    const { data } = await queryMenuList();
    // 初始化全局状态
    return assign(initialState, {
      MenuData: data,
    })
  }
  return initialState;
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }: InitDataType) => {
  console.log(initialState, 'init');
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    // menu: {
    //   locale: false,
    //   params: initialState?.userInfo?.id,
    //   request: async () => {
    //     return initialState?.MenuData
    //   },
    // },
    // 菜单的折叠收起事件
    onCollapse: (collapsed) => {
      setInitialState(s => ({ ...s, Collapsed: collapsed }));
    },
    // ErrorBoundary: () => (
    //   <Result status="error" title="出错了" subTitle="糟糕，页面出了错误，请刷新页面。" />
    // ),

  };
};


export const request: RequestConfig = umiRequest;


interface RouteItem {
  path?: string;
  name?: string;
  icon?: string;
  id?: number | string;
  parentId?: number | string;
  element?: JSX.Element;
  children?: RouteItem[];
  routes: RouteItem[];
}


let extraRoutes: API.Menu[] = [];
const loopMenuItem = (menus: API.Menu[], pId: number | string | undefined): RouteItem[] => {
  return menus.flatMap((item): any => {
    let Component: React.ComponentType<any> | null = null;
    if (item.component) {
      // 防止配置了路由，但本地暂未添加对应的页面，产生的错误
      Component = React.lazy(() => new Promise((resolve, reject) => {
        import(`@/pages${item.component}`)
          .then(module => resolve(module))
          .catch((error) => resolve(import(`@/pages/404.tsx`)))
      }))
    }
    if (item.children) {
      return [
        {
          parentId: pId,
          ...formatRoute(item),
          children: [
            {
              path: item.path,
              element: <Navigate to={item?.redirect ?? item.children[0].path} replace />,
            },
            ...loopMenuItem(item.children, item.menu_id)
          ]
        }
      ]
    } else {
      return [
        {
          ...formatRoute(item),
          parentId: pId,
          element: (
            <ErrorBoundary>
              <React.Suspense fallback={<div>Loading...</div>}>
                {/* {React.createElement(React.lazy(() => import(`@/pages${item.component}`)))} */}
                {Component && <Component />}
              </React.Suspense>
            </ErrorBoundary>

          )
        }
      ]
    }
  })
}

export function patchClientRoutes({ routes }: { routes: RouteItem[] }) {

  const routerIndex = routes.findIndex((item: RouteItem) => item.path === '/')
  const parentId = routes[routerIndex].id
  console.log(routes, 'routes');
  if (extraRoutes.length) {
    // routes[routerIndex]['routes'].unshift({
    //   ...staticRoutes
    // })
    routes[routerIndex]['routes'].push(
      ...loopMenuItem(extraRoutes, parentId)
    )
    console.log('===extraRoutes==,', extraRoutes);
  }
}


export function render(oldRender: any) {
  console.log('===render==');

  queryMenuList().then((res) => {
    if (res) {
      extraRoutes = res.data;
    }
  }).finally(() => {
    oldRender(); // 等请求完了 再执行oldRender
  });

}
