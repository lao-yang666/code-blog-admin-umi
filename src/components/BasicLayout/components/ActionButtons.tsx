/*
 * @Description: 全局通用按钮
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-23 13:47:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-02-02 10:37:46
 */
import { EllipsisOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd'
import { FC, useContext, useState } from 'react'

import { INTERNATION } from '@/utils/enums'

const ActionButtons: FC = () => {
  // 刷新当前组件
  // const { refreshTab } = useContext(KeepAliveContext);
  // 受控展开，需配合 trigger 一起使用
  const [open, setOpen] = useState<boolean>(false)
  return (
    <FloatButton.Group
      open={open}
      icon={<EllipsisOutlined />}
      trigger="click"
      onOpenChange={(open) => setOpen(open)}>
      {/* Github issues*/}
      <FloatButton
        icon={<QuestionCircleOutlined />}
        onClick={() => window.open('//github.com/baiwumm/Xmw-Admin/issues')}
      />
      {/* 项目文档 */}
      <FloatButton
        onClick={() => window.open('//docs.baiwumm.com/personal-project/xmw-admin')}

      />
      {/* 刷新页面 */}
      <FloatButton
        icon={<SyncOutlined />}
        // onClick={() => refreshTab(location.pathname)}
  />
      {/* 回到顶部 */}
      <FloatButton.BackTop visibilityHeight={100} />
    </FloatButton.Group>
  )
}
export default ActionButtons