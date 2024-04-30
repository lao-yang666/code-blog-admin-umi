// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除按钮权限信息 DELETE /button_permission/del/${param0} */
export async function buttonPermissionControllerDeletebuttonPermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ButtonPermissionControllerDeletebuttonPermissionParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/button_permission/del/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 按钮权限详情 GET /button_permission/detail/${param0} */
export async function buttonPermissionControllerGetbuttonPermissionByid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ButtonPermissionControllerGetbuttonPermissionByidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/button_permission/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取按钮权限列表 GET /button_permission/list */
export async function buttonPermissionControllerGetbuttonPermissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ButtonPermissionControllerGetbuttonPermissionsParams,
  options?: { [key: string]: any },
) {
  return request<any>('/button_permission/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增按钮权限信息 POST /button_permission/new */
export async function buttonPermissionControllerCreatebuttonPermission(
  body: API.buttonPermissionNew,
  options?: { [key: string]: any },
) {
  return request<any>('/button_permission/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取不分页的用户列表 GET /button_permission/selist */
export async function buttonPermissionControllerGetSelUserList(options?: { [key: string]: any }) {
  return request<any>('/button_permission/selist', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改按钮权限信息 PUT /button_permission/update/${param0} */
export async function buttonPermissionControllerUpdatebuttonPermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ButtonPermissionControllerUpdatebuttonPermissionParams,
  body: API.buttonPermission,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/button_permission/update/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 按钮权限启用/停用 PUT /button_permission/updateStatus/${param0} */
export async function buttonPermissionControllerUpdatebuttonPermissionStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ButtonPermissionControllerUpdatebuttonPermissionStatusParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/button_permission/updateStatus/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 按钮权限分配人员 GET /button_permission/userAccess/${param0} */
export async function buttonPermissionControllerGetbuttonPermissionUserAccessByid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ButtonPermissionControllerGetbuttonPermissionUserAccessByidParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/button_permission/userAccess/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
