import { Modal } from 'antd';
import React, { PropsWithChildren } from 'react';

interface DiyFormProps {
  title?: string
  modalVisible: boolean;
  onCancel: () => void;
}

const DiyForm: React.FC<PropsWithChildren<DiyFormProps>> = (props) => {
  const { title = '新增', modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title={title}
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default DiyForm;
