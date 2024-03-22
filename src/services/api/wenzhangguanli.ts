// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取文章详情 GET /post/${param0} */
export async function postControllerGetPostById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerGetPostByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/post/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改文章 PUT /post/${param0} */
export async function postControllerUpdatePost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerUpdatePostParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/post/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除文章 DELETE /post/${param0} */
export async function postControllerDeletePost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerDeletePostParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/post/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改文章草稿 PUT /post/draft/${param0} */
export async function postControllerUpdateDraft(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerUpdateDraftParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/post/draft/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 创建文章草稿 POST /post/draft/new */
export async function postControllerCreateDraft(options?: { [key: string]: any }) {
  return request<any>('/post/draft/new', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除文章草稿 DELETE /post/draft${param0} */
export async function postControllerDeleteDraft(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerDeleteDraftParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/post/draft${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取文章列表 GET /post/list */
export async function postControllerGetPublishedPosts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerGetPublishedPostsParams,
  options?: { [key: string]: any },
) {
  return request<any>('/post/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建文章 POST /post/new */
export async function postControllerCreatePost(options?: { [key: string]: any }) {
  return request<any>('/post/new', {
    method: 'POST',
    ...(options || {}),
  });
}
