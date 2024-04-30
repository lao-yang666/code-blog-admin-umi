// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除菜单信息 DELETE /menu/del/${param0} */
export async function menuControllerDeleteMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuControllerDeleteMenuParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/menu/del/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 菜单详情 GET /menu/detail/${param0} */
export async function menuControllerGetMenuByid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuControllerGetMenuByidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/menu/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取菜单列表 GET /menu/list */
export async function menuControllerGetMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuControllerGetMenusParams,
  options?: { [key: string]: any },
) {
  return request<any>('/menu/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增菜单信息 POST /menu/new */
export async function menuControllerCreateMenu(
  body: API.MenuNew,
  options?: { [key: string]: any },
) {
  return request<any>('/menu/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取不分页的用户列表 GET /menu/selist */
export async function menuControllerGetSelUserList(options?: { [key: string]: any }) {
  return request<any>('/menu/selist', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改菜单信息 PUT /menu/update/${param0} */
export async function menuControllerUpdateMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuControllerUpdateMenuParams,
  body: API.Menu,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/menu/update/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 菜单启用/停用 PUT /menu/updateStatus/${param0} */
export async function menuControllerUpdateMenuStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuControllerUpdateMenuStatusParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/menu/updateStatus/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 菜单分配人员 GET /menu/userAccess/${param0} */
export async function menuControllerGetMenuUserAccessByid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuControllerGetMenuUserAccessByidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/menu/userAccess/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
