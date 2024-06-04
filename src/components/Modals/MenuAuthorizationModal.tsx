import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { Tree, Button, Checkbox, Col, Modal, Row, message } from 'antd';
import services from '@/services/api';
import type { TreeDataNode, TreeProps } from 'antd';
import styled from 'styled-components'
const {
  permissionControllerUpdatepermission: modifyMenuView
} = services.quanxianguanli;
const ButtonBox = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
`
interface StaffAuthorizationModalsProps {
  role_id: number;
  title: string | ReactNode;
  menuData: TreeDataNode[];
  checkData: React.Key[];
  modalVisible: boolean;
  onChange: (val: React.Key[]) => void;
  onCancel: () => void;
}

const MenuAuthorizationModal: React.FC<PropsWithChildren<StaffAuthorizationModalsProps>> = (props) => {
  const { title, role_id, menuData, modalVisible, checkData, onChange, onCancel } = props;
  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    onChange(checkedKeysValue as React.Key[]);
  };

  const onConfrim = () => {
    // 确定按钮
    modifyMenuView({
      menu_id: checkData as number[],
      role_id,
    }).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
        onCancel();
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
      <Tree
        checkable
        fieldNames={{ title: 'name', key: 'menu_id' }}
        defaultExpandAll={true}
        onCheck={onCheck}
        checkedKeys={checkData}
        treeData={menuData}
      />
    </Modal>

  );
};

export default MenuAuthorizationModal;

