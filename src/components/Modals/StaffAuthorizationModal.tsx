import React, { PropsWithChildren, ReactNode, useEffect } from 'react';
import { Button, Checkbox, Col, Modal, Row, message } from 'antd';
import services from '@/services/api';
import type { GetProp } from 'antd';
import styled from 'styled-components'
const { userControllerUpdateBatchUser: updateMany } = services.yonghuguanli;
const ButtonBox = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
`

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>;

interface StaffAuthorizationModalsProps {
  role_id: number;
  level: number;
  title: string | ReactNode;
  userData: API.User[];
  checkData: CheckboxValueType[];
  modalVisible: boolean;
  onChange: (val: CheckboxValueType[]) => void;
  onCancel: (reresh?: boolean) => void;
}

const StaffAuthorizationModal: React.FC<PropsWithChildren<StaffAuthorizationModalsProps>> = (props) => {
  const { title, level, role_id, userData, modalVisible, checkData, onChange, onCancel } = props;
  const onConfrim = () => {
    // 确定按钮
    updateMany({
      user_ids: checkData,
      role_id,
    }).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
        onCancel(true);
      }
    })
  }
  return (
    <Modal
      destroyOnClose
      title={title}
      width={520}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={<div>
        <Button type="primary" onClick={() => onConfrim()} style={{ marginRight: '10px' }}>确定</Button>
        <Button onClick={() => onCancel()}>取消</Button>
      </div>}
    >
      <Checkbox.Group style={{ width: '100%', display: 'unset' }} onChange={(checkedValues) => onChange(checkedValues)} value={checkData}>
        <Row style={{ width: '100%', marginBottom: '10px' }}>
          <Col span={12}>
            <span>账号(昵称)</span>
          </Col>
          <Col span={12} >
            <span>当前角色</span>
          </Col>
        </Row>
        {userData.map((item) => (
          <Row key={item.id} justify="space-between" style={{ width: '100%', marginBottom: '10px' }}>
            <Col span={12}>
              <span>{item.name}</span><span>({item.nickName})</span>
            </Col>
            <Col span={8}>
              <span>{item.role_name}</span>
              {checkData.includes(item.id) ? item.role_level && item.role_level > level ? <span style={{ color: 'green' }}>&#x2191;&#x2191;
              </span> : <span style={{ color: 'red' }}>&#x2193;&#x2193;</span> : null}
            </Col>
            <Col span={1} offset={3}>
              <Checkbox value={item.id}></Checkbox>
            </Col>
          </Row>
        ))}
      </Checkbox.Group>
    </Modal>

  );
};

export default StaffAuthorizationModal;

