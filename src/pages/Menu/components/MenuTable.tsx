import React, { useState } from 'react';
import { Button, Space, Switch, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { PageContainer } from '@ant-design/pro-components';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

const columns: TableColumnsType<API.Menu> = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name',
    width: 40,
  },
  {
    title: '路由地址',
    dataIndex: 'path',
    key: 'path',
    width: 200,
  },
  {
    title: '组件地址',
    dataIndex: 'component',
    key: 'component',
    width: 200,
  },
  {
    title: '重定向地址',
    dataIndex: 'redirect',
    key: 'redirect',
    width: 200,
  },
  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 200,
  },
  {
    title: '额外配置',
    dataIndex: 'extraProperties',
    key: 'extraProperties',
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 320,
    render(value, record, index) {
      return (
        <>
          <Button>编辑</Button>
          <Button>新增子菜单</Button>
          <Button>删除</Button>
        </>
      )
    },
  },
];

const data: API.Menu[] = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<API.Menu> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const App: React.FC = () => {
  const [checkStrictly] = useState(false);

  return (
    <PageContainer>
      <Button>新增一级菜单</Button>
      <Table
        bordered
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={data}
      />
    </PageContainer>
  );
};

export default App;