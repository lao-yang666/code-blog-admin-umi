// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /auth/login */
export async function authControllerLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/auth/login', {
    method: 'POST',
    ...(options || {}),
  });
}
