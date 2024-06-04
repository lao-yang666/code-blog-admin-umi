/*
 * @Description: 自定义操作列表	
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-14 14:11:04
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-12 11:30:54
 */
import { HeaderProps } from '@ant-design/pro-components'

import FullScreen from './FullScreen' // 全屏

export default function actionsRender(props: HeaderProps) {
  // 判断是否侧边布局
  const isSide = props.layout === 'side'
  if (props.isMobile || typeof window === 'undefined') return [];
  return [
    // props.layout !== 'side' && document.body.clientWidth > 1400 ? (
    //   <SearchInput />
    // ) : undefined,
    // 全屏
    <FullScreen key="FullScreen" />,
    // 多语言
  ];
}