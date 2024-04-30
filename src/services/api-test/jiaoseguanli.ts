// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除角色信息 DELETE /role/del/${param0} */
export async function roleControllerDeleteRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerDeleteRoleParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/role/del/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 角色详情 GET /role/detail/${param0} */
export async function roleControllerGetRoleByid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerGetRoleByidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/role/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取角色列表 GET /role/list */
export async function roleControllerGetRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerGetRolesParams,
  options?: { [key: string]: any },
) {
  return request<any>('/role/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增角色信息 POST /role/new */
export async function roleControllerCreateRole(
  body: API.RoleNew,
  options?: { [key: string]: any },
) {
  return request<any>('/role/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取不分页的用户列表 GET /role/selist */
export async function roleControllerGetSelUserList(options?: { [key: string]: any }) {
  return request<any>('/role/selist', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改角色信息 PUT /role/update/${param0} */
export async function roleControllerUpdateRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerUpdateRoleParams,
  body: API.Role,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/role/update/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 修改角色信息 PUT /role/updateStatus/${param0} */
export async function roleControllerUpdateRoleStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerUpdateRoleStatusParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/role/updateStatus/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 角色分配人员 GET /role/userAccess/${param0} */
export async function roleControllerGetRoleUserAccessByid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerGetRoleUserAccessByidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/role/userAccess/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
