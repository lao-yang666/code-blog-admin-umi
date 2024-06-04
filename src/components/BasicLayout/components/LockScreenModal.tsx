/*
 * @Description: 锁定屏幕弹窗
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-11 11:18:51
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-12 15:33:21
 */
import { useModel } from '@umijs/max'
import { useBoolean, useLocalStorageState, useMount } from 'ahooks'
import { Avatar, Col, Form, Input, Modal, Row, Typography } from 'antd'
import { FC } from 'react'

import { INTERNATION } from '@/utils/enums'

import LockScreen from './LockScreen' // 锁屏弹窗

const { Title } = Typography;

type LockScreenModalProps = {
  open: boolean;
  setOpenFalse: () => void;
}

const LockScreenModal: FC<LockScreenModalProps> = ({ open = false, setOpenFalse }) => {
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  // 是否显示锁屏页面
  const [openLockPage, { setTrue: setLockPageTrue, setFalse: setLockPageFalse }] = useBoolean(false);
  // 表单实例
  const [form] = Form.useForm()
  // 记录锁屏密码
  const [lockPassword, setLockPassword] = useLocalStorageState<string>('lock_password');

  // 提交表单
  const hanlderSubmit = () => {
    // 触发表单校验
    form.validateFields().then((values: { name: string }) => {
      // 将锁屏密码保存到 localstorage
      setLockPassword(values.name)
      setOpenFalse()
      // 弹窗锁屏页面
      setLockPageTrue()
    })
  }

  // 如果有锁屏密码，则表示已锁屏
  useMount(() => {
    if (lockPassword) {
      setLockPageTrue()
    }
  })

  return (
    <>
      <Modal
        title={'是否显示锁屏弹窗'}
        open={open}
        onCancel={setOpenFalse}
        onOk={hanlderSubmit}
      >
        <Row justify="center" style={{ flexDirection: 'column', textAlign: 'center' }}>
          <Col>
            <Avatar
              size={120}
              src={initialState?.userInfo?.avatar_url}
            />
          </Col>
          <Col>
            <Title level={2}>{initialState?.userInfo?.nickName}</Title>
          </Col>
          <Col>
            <Form form={form} style={{ textAlign: 'left' }}>
              <Form.Item
                name="password"
                label={'账号'}
                rules={[{ required: true, min: 6, max: 12 }]}
              >
                <Input.Password
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
      {/* 锁屏弹窗 */}
      {openLockPage ? <LockScreen setLockPageFalse={setLockPageFalse} /> : null}
    </>
  )
}
export default LockScreenModal