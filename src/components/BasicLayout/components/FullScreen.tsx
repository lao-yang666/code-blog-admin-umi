/*
 * @Description: 全屏
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-03 15:46:18
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-14 15:55:17
 */
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { useFullscreen } from 'ahooks';
import { Tooltip } from 'antd'
import type { FC } from 'react'


const FullScreen: FC = () => {
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(() => document.body);
  return (
    <>
      {
        isFullscreen ?
          <Tooltip title='退出全屏'>
            <FullscreenExitOutlined onClick={exitFullscreen} />
          </Tooltip>
          :
          <Tooltip title='全屏'>
            <FullscreenOutlined onClick={enterFullscreen} />
          </Tooltip>
      }
    </>
  )
}

export default FullScreen