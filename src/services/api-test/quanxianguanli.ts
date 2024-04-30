// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 角色分配菜单 GET /permission/menuAccess/${param0} */
export async function permissionControllerGetRoleUserAccessByid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionControllerGetRoleUserAccessByidParams,
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
  body: API.PermissionNew,
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

/** 删除权限信息 DELETE /permissions/del/${param0} */
export async function permissionsControllerDeletePermissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionsControllerDeletePermissionsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/permissions/del/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 权限详情 GET /permissions/detail/${param0} */
export async function permissionsControllerGetPermissionsByid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionsControllerGetPermissionsByidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/permissions/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取权限列表 GET /permissions/list */
export async function permissionsControllerGetPermissionss(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionsControllerGetPermissionssParams,
  options?: { [key: string]: any },
) {
  return request<any>('/permissions/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增权限信息 POST /permissions/new */
export async function permissionsControllerCreatePermissions(
  body: API.PermissionsNew,
  options?: { [key: string]: any },
) {
  return request<any>('/permissions/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取不分页的用户列表 GET /permissions/selist */
export async function permissionsControllerGetSelUserList(options?: { [key: string]: any }) {
  return request<any>('/permissions/selist', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改权限信息 PUT /permissions/update/${param0} */
export async function permissionsControllerUpdatePermissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionsControllerUpdatePermissionsParams,
  body: API.Permissions,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/permissions/update/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 权限启用/停用 PUT /permissions/updateStatus/${param0} */
export async function permissionsControllerUpdatePermissionsStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionsControllerUpdatePermissionsStatusParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/permissions/updateStatus/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}
