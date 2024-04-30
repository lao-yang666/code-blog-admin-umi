import services from '@/services/api';
import {
  ActionType,
  PageContainer,
  ProDescriptions,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import DiyForm from '@/components/DiyForm';
const { menuControllerGetSelMenuList: getMenuData } = services.caidanguanli;
const { buttonPermissionControllerCreatebuttonPermission: addbuttonPermission,
  buttonPermissionControllerGetbuttonPermissions: querybuttonPermissionList,
  buttonPermissionControllerDeletebuttonPermission: deletebuttonPermission,
  buttonPermissionControllerUpdatebuttonPermission: modifybuttonPermission } =
  services.anniuquanxianguanli;

/**
 * 添加
 * @param fields
 */
const handleAdd = async (fields: API.buttonPermissionNew) => {
  const hide = message.loading('正在添加');
  try {
    await addbuttonPermission({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在修改');
  try {
    await modifybuttonPermission(
      { id: fields.id },
      {
        ...fields,
      },
    );
    hide();

    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 *  删除
 * @param selectedRows
 */
const handleDel = async (id: string | undefined) => {
  if (!id) return;
  const hide = message.loading('正在删除');
  try {
    await deletebuttonPermission({ id });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const getMenuList = async () => {
  const { data } = await getMenuData();
  return data
};


const TableList: React.FC<unknown> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [params, setParams] = useState({});
  const [tableAction, handleTableAction] =
    useState<string>('add');
  const [currentRecord, setCurrentRecord] = useState<API.buttonPermission>({} as any);
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.buttonPermission>();
  const formColumns: ProColumns<API.buttonPermission>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      initialValue: currentRecord?.name,
      fieldProps: {
        readOnly: tableAction === 'edit'
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
    },
    {
      title: '作用形式',
      dataIndex: 'effect_form',
      initialValue: currentRecord?.effect_form,
      hideInSearch: true,
      valueEnum: {
        '0': { text: '隐藏', status: '藏' },
        '1': { text: '禁用', status: '禁用' },
        '2': { text: '启用', status: '启用' },
      },
    },
    {
      title: '所属菜单名称',
      dataIndex: 'menu_id',
      initialValue: currentRecord?.menu_id,
      hideInSearch: true,
      request: getMenuList,
      valueType: 'treeSelect',
      fieldProps: {
        fieldNames: { label: 'name', value: 'menu_id' },
        defaultExpandAll: true,
        showSearch: true,
      },
      render: (_, record) => record?.menu?.name,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '所属菜单名称为必填项',
          },
        ],
      },
    },
    {
      title: '所属菜单地址',
      dataIndex: 'menu_id',
      initialValue: currentRecord?.menu_id,
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => record?.menu?.path,
    },
    {
      title: '权限标识',
      dataIndex: 'permission_key',
      tip: '通过F12打开浏览器调试模式,查看指定按钮的id属性,即为权限标识',
      hideInSearch: true,
      initialValue: currentRecord?.permission_key,
    },
    {
      title: '描述',
      dataIndex: 'describe',
      valueType: 'textarea',
      hideInSearch: true,
      initialValue: currentRecord?.describe,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleModalVisible(true);
              setCurrentRecord(record);
              handleTableAction('edit')
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setRow(record)
            }}
          >
            查看
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              await handleDel(String(record.id))
              actionRef.current?.reloadAndRest?.();
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];
  const handleSubmit = async (value: any) => {
    let callApi = handleAdd;
    if (tableAction === 'edit') {
      callApi = handleUpdate
      Object.assign(value, { id: currentRecord.id })
    }
    const success = await callApi(value);
    if (success) {
      handleModalVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  }

  const handleFormChange = (changedValues: any, allValues: any) => {
    setParams(allValues)
    console.log(changedValues, allValues);
  };

  return (
    <><ProTable<API.buttonPermission>
      actionRef={actionRef}
      rowKey="id"
      pagination={{
        pageSize: 10,
      }}
      params={params}
      form={{
        onValuesChange: handleFormChange
      }}
      bordered
      search={{
        labelWidth: 60,
        span: {
          xs: 24,
          sm: 24,
          md: 12,
          lg: 12,
          xl: 8,
          xxl: 4,
        },
      }}
      toolBarRender={() => [
        <Button
          key="1"
          type="primary"
          onClick={() => { handleModalVisible(true); handleTableAction('add'); setCurrentRecord({}); }}
        >
          新增按钮权限
        </Button>,
      ]}
      request={async (params, sorter, filter) => {
        const { data, success } = await querybuttonPermissionList({
          ...params,
          // FIXME: remove @ts-ignore
          // @ts-ignore
          sorter,
          ...filter,
        });
        return {
          data: data?.list || [],
          success,
          total: data?.total || 0,
        };
      }}
      columns={formColumns} /><DiyForm title={tableAction === 'edit' ? '编辑按钮权限' : '新增按钮权限'} modalVisible={modalVisible} onCancel={() => handleModalVisible(false)}>
        <ProTable<API.buttonPermission>
          onSubmit={handleSubmit}
          rowKey="id"
          type="form"
          columns={formColumns} />
      </DiyForm><Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<API.buttonPermission>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={formColumns} />
        )}
      </Drawer></>
  );
};

export default TableList;
