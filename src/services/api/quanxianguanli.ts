// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 角色分配菜单 GET /permission/menuAccess/${param0} */
export async function permissionControllerGetRoleUserAccessByid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/permission/menuAccess/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改菜单权限信息 PUT /permission/update */
export async function permissionControllerUpdatepermission(
  body: {
    menu_id: number[],
    role_id: number,
  },
  options?: { [key: string]: any },
) {
  return request<any>('/permission/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}






