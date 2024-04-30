import {
  PageContainer,
} from '@ant-design/pro-components';
import React, { useState } from 'react';
import Button_Permisssion from './components/Button_Permission';
import Permisssions from './components/Permissions';
const TableList: React.FC<unknown> = () => {
  const [activeTab, setActiveTab] = useState('base');
  return (
    <PageContainer
      header={{
        title: '权限管理',
      }}
      tabProps={{ type: 'card' }}
      tabActiveKey={activeTab}
      onTabChange={(key) => {
        setActiveTab(key);
      }}
      tabList={[
        {
          tab: '权限管理',
          key: 'base',
        },
        {
          tab: '按钮权限管理',
          key: 'btn',
        },
      ]}
    >
      {activeTab === 'base' ? <Permisssions /> : <Button_Permisssion />}
    </PageContainer >
  );
};

export default TableList;
