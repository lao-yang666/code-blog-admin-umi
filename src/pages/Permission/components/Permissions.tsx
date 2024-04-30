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
const { permissionsControllerCreatePermissions: addPermissions,
  permissionsControllerGetPermissionss: queryPermissionsList,
  permissionsControllerDeletePermissions: deletePermissions,
  permissionsControllerUpdatePermissions: modifyPermissions } =
  services.quanxianguanli;

/**
 * 添加
 * @param fields
 */
const handleAdd = async (fields: API.PermissionsNew) => {
  const hide = message.loading('正在添加');
  try {
    await addPermissions({ ...fields });
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
    await modifyPermissions(
      { id: fields.id },
      {
        ...fields
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
    await deletePermissions({ id });
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
  const [currentRecord, setCurrentRecord] = useState<API.Permissions>({} as any);
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.Permissions>();
  const formColumns: ProColumns<API.Permissions>[] = [
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
      title: '作用范围',
      dataIndex: 'scope',
      initialValue: currentRecord?.scope,
      hideInSearch: true,
      valueEnum: {
        'role': { text: '角色', status: '角色' },
        'menu': { text: '菜单', status: '菜单' },
      },
    },
    {
      title: '权限标识',
      dataIndex: 'permission_key',
      hideInSearch: true,
      initialValue: currentRecord?.permission_key,
      // valueEnum: {
      //   'write': { text: '读写', status: '读写' },
      //   'read': { text: '只读', status: '只读' },
      // },
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
    <><ProTable<API.Permissions>
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
          新增权限
        </Button>,
      ]}
      request={async (params, sorter, filter) => {
        const { data, success } = await queryPermissionsList({
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
      columns={formColumns} /><DiyForm title={tableAction === 'edit' ? '编辑权限' : '新增权限'} modalVisible={modalVisible} onCancel={() => handleModalVisible(false)}>
        <ProTable<API.Permissions>
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
          <ProDescriptions<API.Permissions>
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
