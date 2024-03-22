import { Button, message } from 'antd';
import React, { PropsWithChildren } from 'react';
import {
  ModalForm
} from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
interface DiyFormProps {
  title?: string;
  triggerText?: string;
  modalVisible: boolean;
}

const DiyForm: React.FC<PropsWithChildren<DiyFormProps>> = (props) => {
  const { title = '新增', modalVisible, triggerText = '新增', } = props;

  return (
    <ModalForm
      title={title}
      open={modalVisible}
      modalProps={{
        destroyOnClose: true,
      }}
      submitter={false}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          {triggerText}
        </Button>
      }
      onFinish={async (values) => {
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
    >
      {props.children}
    </ModalForm>
  );
};

export default DiyForm;
