// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除用户 DELETE /user/del/${param0} */
export async function userControllerDeleteDraft(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerDeleteDraftParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/user/del/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查看用户详情 GET /user/detail/${param0} */
export async function userControllerGetUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerGetUserByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/user/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户列表 GET /user/list */
export async function userControllerGetUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerGetUserListParams,
  options?: { [key: string]: any },
) {
  return request<any>('/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增用户 POST /user/new */
export async function userControllerCreateUser(
  body: API.UserNew,
  options?: { [key: string]: any },
) {
  return request<any>('/user/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取不分页的用户列表 GET /user/selist */
export async function userControllerGetSelUserList(options?: { [key: string]: any }) {
  return request<any>('/user/selist', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改用户 PUT /user/update/${param0} */
export async function userControllerUpdateUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerUpdateUserParams,
  body: API.User,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/user/update/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量修改用户 PUT /user/updateBatch */
export async function userControllerUpdateManyUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/user/updateBatch', {
    method: 'PUT',
    ...(options || {}),
  });
}
