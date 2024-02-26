import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  proxy: {
    '/api': {
      // 要代理的地址
      target: 'http://localhost:3001',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '/api': '' },
    },
  },
  layout: {
    title: '大数据管理平台2',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    // {
    //   name: '权限演示2',
    //   path: '/access',
    //   component: './Access',
    // },
    {
      name: '用户管理',
      path: '/User',
      component: './User',
    },
    {
      name: '文章管理',
      path: '/Post',
      component: './Post',
    },
  ],
  npmClient: 'yarn',
});