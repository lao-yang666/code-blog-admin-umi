/*
 * @Description: ProLayout API
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-14 15:16:33
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-02-02 09:59:21
 */
import { HeaderProps } from '@ant-design/pro-components'

import { IconFont } from '@/utils/format'

/* 跨站点导航列表 */
export const appList: HeaderProps['appList'] = [
  {
    icon: 'http://101.43.20.171:9090/static/img/37.jpg',
    title: '老羊',
    desc: '独乐乐不如众乐乐',
    url: 'http://101.43.20.171:9090/',
    target: '_blank',
  },
  {
    icon: <IconFont type="icon-GitHub" style={{ fontSize: '40px' }} />,
    title: 'laoyang666',
    desc: '致力于成为一名优秀的前端工程师',
    url: 'https://github.com/lao-yang666',
    target: '_blank',
  },
  {
    icon: 'http://101.43.20.171:2024/local/file/aurora/config/dd6c0071bbb993031e80292be4e86bb7.jpg',
    title: '32',
    desc: '一名优秀的后端工程师个人博客',
    url: 'http://101.43.20.171:2024/',
    target: '_blank',
  },
  {
    icon: <IconFont type="icon-juejin" style={{ fontSize: '40px' }} />,
    title: '风中追羽',
    desc: '少壮不努力老大徒伤悲',
    url: 'https://juejin.cn/user/1640931993324717',
    target: '_blank',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    title: 'ProComponents',
    desc: '让中后台开发更简单',
    url: 'https://procomponents.ant.design/',
    target: '_blank',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/bmw-prod/598d14af-4f1c-497d-b579-5ac42cd4dd1f/k7bjua9c_w132_h130.png',
    title: 'Umi Max',
    desc: '基于 React 的可扩展的企业级前端应用框架',
    url: 'https://umijs.org/docs/max/introduce',
    target: '_blank',
  },
  {
    icon: <IconFont type="icon-gitee" style={{ fontSize: '40px' }} />,
    title: 'prismajs',
    desc: '下一代 Node.js、TypeScript、Go 的数据库 ORM',
    url: 'https://prisma.yoga/',
    target: '_blank',
  },
  {
    icon: 'https://docs.nestjs.cn/_media/icon.svg',
    title: 'nestjs',
    desc: '构建服务端应用程序的渐进式 Node.js 框架',
    url: 'https://docs.nestjs.cn/',
    target: '_blank',
  },
]