// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import umiRequest from '@/utils/request';
import 'bytemd/dist/index.css'
import '../public/css/index.css'
import './pages/index.css'
import { getToken, getSessionStorageItem, setSessionStorageItem } from '@/utils';
import type { InitialStateTypes } from '@/utils/types'
import { menuControllerGetSelMenuList as queryMenuList, menuControllerGetSelPermissionList as roleGetMenuAccessByid } from '@/services/api/caidanguanli'
import { permissionControllerGetRoleUserAccessByid as getMenuView, } from '@/services/api/quanxianguanli'
import { history } from '@umijs/max';
import { eq, assign } from 'lodash';
import TabsLayout, { TabsLayoutProps } from './components/TabsLayout';
import type { DynamicRoutes } from '@/utils/types/dynamicroutes/typings';
import { BasiLayout } from '@/components/BasicLayout'; // 全局 layout 布局
import loopMenuItem from './components/DiyRouteItem';
import { LOCAL_STORAGE } from './utils/enums';
import defaultSettings from './config/defaultSettings';

export async function getInitialState(): Promise<InitialStateTypes> {
  const Layout_Settings = getSessionStorageItem<TabsLayoutProps>(LOCAL_STORAGE.LAYOUT) ?? defaultSettings;
  const userInfo = getSessionStorageItem<API.User>("userInfo") ?? undefined;
  setSessionStorageItem(LOCAL_STORAGE.LAYOUT, Layout_Settings)
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
    const [menu, roleMenu, menuView] = await Promise.all([queryMenuList(), roleGetMenuAccessByid({ roleId: Number(userInfo?.role_id) }), getMenuView({ id: Number(userInfo?.role_id) })])
    // 初始化全局状态
    return assign(initialState, {
      CurrentRoleId: Number(userInfo?.role_id),
      MenuData: menu.data,
      Permissions: roleMenu.data,
      menuViewIds: menuView.data.map((item: API.Permission) => item.menu_id),
    })
  }
  return initialState;
}

export const layout = BasiLayout;


//注意这里 传入了 initialState
export async function tabsLayout({ initialState }) {
  return {
    local: {},
    icons: {},
  };
}

export const getCustomTabs = () => (props: TabsLayoutProps) => <TabsLayout {...props} />


export const request = umiRequest;


let extraRoutes: API.Menu[] = [];

export function patchClientRoutes({ routes }: { routes: DynamicRoutes.RouteItem[] }) {

  const routerIndex = routes.findIndex((item: DynamicRoutes.RouteItem) => item.path === '/')
  const parentId = routes[routerIndex].id
  if (extraRoutes.length) {
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
