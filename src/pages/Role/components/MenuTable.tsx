import React, { PropsWithChildren } from 'react';
import { Switch, Table } from 'antd';
import type { TableColumnsType, } from 'antd';

interface MenuTableProps {
  tableData: API.buttonPermission[];
  handleSwitch: (val: number, val2: number) => void;
  selectedRowKeys: React.Key[]
  setSelectedRowKeys: (val: React.Key[]) => void;
}

const App: React.FC<PropsWithChildren<MenuTableProps>> = (props) => {
  const { tableData, handleSwitch, selectedRowKeys, setSelectedRowKeys } = props
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: TableColumnsType<API.buttonPermission> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '作用形式',
      dataIndex: 'effect_form',
      key: 'effect_form',
      render: (_, record) => record?.effect_form?.replace('0', '隐藏').replace('1', '禁止').replace('2', '显示'),
    },
    {
      title: '所属菜单名称',
      dataIndex: 'menu_name',
      key: 'menu_name',
      render: (_, record) => record?.menu?.name,
    },
    {
      title: '所属菜单地址',
      dataIndex: 'menu_path',
      key: 'menu_path',
      render: (_, record) => record?.menu?.path,
    },
    {
      title: '权限标识',
      key: 'permission_key',
      dataIndex: 'permission_key',
    },
    {
      title: '状态',
      dataIndex: 'status',

      render: (_, record) => (
        <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={record.status === 1} onChange={(checked) => {
          handleSwitch(record.id, checked ? 1 : 0)
        }} />
      )
    },
    {
      title: '描述',
      dataIndex: 'describe',
      key: 'describe',
      width: 300,
    },
  ];
  return (
    <>
      <Table
        rowKey="id"
        bordered
        columns={columns}
        rowSelection={rowSelection}
        dataSource={tableData}
      />
    </>
  );
};

export default App;