/*
 * @Description: 全局公共方法
 * @Version: 2.0
 * @Author: laoyang
 * @LastEditors: laoyang
 */
import type { ColumnsState } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { eq, sample } from 'lodash';
import { stringify } from 'querystring';

// import { getPermissions, getRoutesMenus, getUserInfo } from '@/services/logic/login' // 登录相关接口
import { LOCAL_STORAGE, ROUTES } from '@/utils/enums'
import type { LockSleepTypes } from '@/utils/types'
import { REQUEST_CODE } from './enums';
/**
 * @description: 判断请求是否成功
 * @author: laoyang
 */
export const isSuccess = (code?: number): boolean => eq(code, REQUEST_CODE.SUCCESS)

export const isLogin = (): boolean => {
  const isLogin = sessionStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  return !!isLogin
}

export const saveToken = (value: string) => {
  sessionStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, value);
}

export const getToken = () => {
  return sessionStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
}

/**
 * @description: 获取 localstorage 的值
 * @author: 白雾茫茫丶
 */
export const getLocalStorageItem = <T>(key: string): T | null => {
  // 获取 值
  const item = localStorage.getItem(key);
  // 判断是否为空 
  if (item === null) {
    return null;
  }
  // 不为空返回解析后的值
  const result: T = JSON.parse(item);
  return result
}

/**
 * @description: 存储 localstorage 的值
 * @author: 白雾茫茫丶
 */
export const setLocalStorageItem = <T>(key: string, value: T) => {
  const result = JSON.stringify(value);
  localStorage.setItem(key, result);
}

/**
 * @description: 移除 localstorage 的值
 * @author: 白雾茫茫丶
 */
export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
}

/**
 * @description: 获取 sessionStorage 的值
 * @author: laoyang
 */
export const getSessionStorageItem = <T>(key: string): T | null => {
  // 获取 值
  const item = sessionStorage.getItem(key);
  // 判断是否为空 
  if (item === null) {
    return null;
  }
  // 不为空返回解析后的值
  const result: T = JSON.parse(item);
  return result
}

/**
 * @description: 存储 sessionStorage 的值
 * @author: laoyang
 */
export const setSessionStorageItem = <T>(key: string, value: T) => {
  const result = JSON.stringify(value);
  sessionStorage.setItem(key, result);
}

/**
 * @description: 移除 sessionStorage 的值
 * @author: laoyang
 */
export const removeSessionStorageItem = (key: string) => {
  sessionStorage.removeItem(key);
}

/**
 * @description: 退出登录返回到登录页
 * @Author: laoyang
 */
export const logoutToLogin = () => {
  const { search, pathname } = window.location;
  // 获取 LOCK_SLEEP 信息
  const LOCK_SLEEP = getSessionStorageItem<LockSleepTypes>(LOCAL_STORAGE.LOCK_SLEEP)
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // 移除 token
  removeSessionStorageItem(LOCAL_STORAGE.ACCESS_TOKEN)
  // 取消睡眠弹窗
  if (LOCK_SLEEP) {
    setSessionStorageItem(LOCAL_STORAGE.LOCK_SLEEP, { ...LOCK_SLEEP, isSleep: false })
  }
  // 重定向地址
  if (window.location.pathname !== ROUTES.LOGIN && !redirect) {
    history.replace({
      pathname: ROUTES.LOGIN,
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
}

/**
 * @description: 获取当前时间
 * @Author: laoyang
 */
export const timeFix = (): string => {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '夜深了'
}

/**
 * @description: 随机欢迎语
 * @Author: laoyang
 */
export const welcomeWords = (): string => {
  const words: string[] = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 LOL', '我猜你可能累了', '认真工作吧', '今天又是充满活力的一天']
  return sample(words) ?? words[0]
}

/**
 * @description: 判断是否是HTTP或HTTPS链接
 * @param {string} link
 * @Author: laoyang
 */
export const isHttpLink = (link: string): boolean => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol  
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name  
    '((\\d{1,3}\\.){3}\\\d{1,3}))' + // OR ip (v4) address  
    '(\\:\\d+)?' + // port  
    '(\\/[-a-z\\d%_.~+]*)*' + // path  
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string  
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator  
  return pattern.test(link);
}

/**
 * @description: 默认不显示的 column 项
 * @author: laoyang
 */
export const renderColumnsStateMap = (MENU_CFG: string[] = []) => {
  const result: Record<string, ColumnsState> = {}
  MENU_CFG.forEach((ele) => {
    result[ele] = {
      show: false,
    }
  })
  return result
}

/**
 * @description: Tag 标签随机颜色
 * @author: laoyang
 */
export const randomTagColor = () => {
  const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  return sample(colors)
}

// export const encryptionAesPsd = (password: string): string => {
//   const encrypted = CryptoJS.AES.encrypt(password, CRYPTO_KEY, {
//     iv: CRYPTO_IV,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return encrypted.toString(); // 返回的是base64格式的密文
// };