
import { defineConfig } from '@umijs/max';
import { staticRoutes } from './routes';
import proxy from './proxy';
const { REACT_APP_ENV = 'dev' } = process.env;
export default defineConfig({
  /**
 * @name 开启 多tab标签页支持
 * @doc https://juejin.cn/post/7153525746751766559
 */

  // keepalive: [/./],
  tabsLayout: {
    // 是否使用自定义的 tabs 组件，需要搭配运行时配置 getCustomTabs 使用
    hasCustomTabs: true,
    // 是否开启右侧的 tabs 管理器，可以实现“关闭左侧”，“关闭右侧”，“关闭其他”和“刷新”等功能。
    hasDropdown: true,
    hasFixedHeader: false,
  },

  plugins: [
    '@umijs/max-plugin-openapi',
    '@alita/plugins/dist/tabs-layout',
    require.resolve('@umijs/plugins/dist/unocss')],

  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},

  unocss: {
    // 检测 className 的文件范围，若项目不包含 src 目录，可使用 `pages/**/*.tsx`
    watch: ['src/**/*.tsx']
  },

  define: {
    'process.env': {
      ICONFONT_URL: '//at.alicdn.com/t/c/font_3629707_x0dxkt3btrg.js',
    },
  },

  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath:
        'http://localhost:3000/swagger-json',
      // 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      mock: false,
      projectName: 'api-test',
    },
  ],

  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],

  layout: {
    title: '大数据管理平台2',
  },

  routes: staticRoutes,
  //routes,

  alias: {
    '@': './src',
    '~': './public'
  },
  npmClient: 'yarn',
});