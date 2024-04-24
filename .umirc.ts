
import { defineConfig } from '@umijs/max';
import routes from './src/routes/routes';
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  plugins: ['@umijs/max-plugin-openapi'],
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // requestLibPath: "import { request } from 'umi'",
      // schemaPath: path.join(__dirname, 'openapi.json'),
      schemaPath:
        'http://localhost:3000/swagger-json',
      // 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      mock: false,
      projectName: 'api-test',
    },
  ],



  proxy: {
    '/api': {
      // 要代理的地址
      // target: 'http://101.43.20.171:3000',
      target: 'http://localhost:3000',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '^/api': '/' },
    },
  },
  layout: {
    title: '大数据管理平台2',
  },
  routes,
  alias: {
    '@': './src',
    '~': './public'
  },
  npmClient: 'yarn',
});