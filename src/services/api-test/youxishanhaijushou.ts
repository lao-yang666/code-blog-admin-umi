// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取巨兽详情 GET /monster/${param0} */
export async function monsterControllerGetMonsterById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MonsterControllerGetMonsterByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/monster/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除巨兽信息 DELETE /monster/${param0} */
export async function monsterControllerDeleteMonster(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MonsterControllerDeleteMonsterParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/monster/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取巨兽列表 GET /monster/list */
export async function monsterControllerGetMonsters(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MonsterControllerGetMonstersParams,
  options?: { [key: string]: any },
) {
  return request<any>('/monster/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增巨兽信息 POST /monster/new */
export async function monsterControllerCreateMonster(options?: { [key: string]: any }) {
  return request<any>('/monster/new', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改巨兽信息 PUT /monster/new/${param0} */
export async function monsterControllerPublishMonster(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MonsterControllerPublishMonsterParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/monster/new/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}
