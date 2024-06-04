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
import { useAccess } from '@umijs/max';
import AccessButton from '@/components/AccessButton';
import { useModel } from '@umijs/max';
const { roleControllerGetSelRoleList: getRoleOption } = services.jiaoseguanli;
const { userControllerCreateUser: addUser, userControllerGetUserList: queryUserList, userControllerDeleteDraft: deleteUser, userControllerUpdateUser: modifyUser } =
  services.yonghuguanli;

/**
 * 添加
 * @param fields
 */
const handleAdd = async (fields: API.UserNew) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({ ...fields });
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
    await modifyUser(
      { id: fields.id },
      {
        id: fields.id,
        phone: fields.phone,
        password: fields.password,
        role_id: fields.role_id,
        name: fields.name || '',
        nickName: fields.nickName || '',
        email: fields.email || '',
        gender: fields.gender || '女',
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
    await deleteUser({ id });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<unknown> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [params, setParams] = useState({});
  const [tableAction, handleTableAction] =
    useState<string>('add');
  const { initialState } = useModel('@@initialState');
  const [currentRecord, setCurrentRecord] = useState<API.User>({} as any);
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.User>();

  const getRoleList = async () => {
    const { data } = await getRoleOption();
    return (data ?? []).filter((item: API.Role) => (
      item.sort >= (initialState?.userInfo?.role?.sort as number)
    )).map((item: API.Role) => ({
      label: item.role_name,
      value: item.id,
    }))
  };

  const formColumns: ProColumns<API.User>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      tip: '名称是唯一的 key',
      initialValue: currentRecord?.name,
      fieldProps: {
        readOnly: tableAction === 'edit'
      },
      hideInSearch: true,
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
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'text',
      initialValue: currentRecord?.nickName,
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      valueType: 'text',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '手机号码为必填项',
          },
        ],
      },
      initialValue: currentRecord?.phone,
    },
    {
      title: '角色',
      dataIndex: 'role_id',
      request: getRoleList,
      initialValue: currentRecord?.role_id,
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '角色为必填项',
          },
        ],
      },
      render: (_, record) => record?.role_name
    },
    {
      title: '密码',
      dataIndex: 'password',
      valueType: 'text',
      hideInForm: !!currentRecord?.id,
      hideInSearch: true,
      initialValue: currentRecord?.password,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '密码为必填项',
          },
        ],
      },
      render: () => '********',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      initialValue: currentRecord?.gender,
      valueEnum: {
        'man': { text: '男', status: '男' },
        'woman': { text: '女', status: '女' },
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      initialValue: currentRecord?.email,
      valueType: 'text',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '邮箱为必填项',
          },
        ],
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <AccessButton
            hidedivider={true}
            permission_key='system-user-edit'
            type='link'
            level={record.role_level}
            onClick={() => {
              handleModalVisible(true);
              setCurrentRecord(record);
              handleTableAction('edit')
            }}>
            编辑
          </AccessButton>
          <AccessButton permission_key='system-user-detail' type='link' onClick={() => {
            setRow(record)
          }}>
            查看
          </AccessButton>
          <AccessButton
            permission_key='system-user-delete'
            type='link'
            level={record.role_level}
            onClick={async () => {
              await handleDel(String(record.id))
              actionRef.current?.reloadAndRest?.();
            }}>
            删除
          </AccessButton>
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
    <PageContainer
      header={{
        title: '用户管理',
      }}
    >
      <ProTable<API.User>
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
          <AccessButton
            key="1"
            type="primary"
            permission_key='system-user-new'
            onClick={() => { handleModalVisible(true); handleTableAction('add'); setCurrentRecord({} as any) }}>
            新增用户
          </AccessButton>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryUserList({
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
        columns={formColumns}
      />
      <DiyForm title={tableAction === 'edit' ? '编辑用户' : '新增用户'} modalVisible={modalVisible} onCancel={() => handleModalVisible(false)}>
        <ProTable<API.User>
          onSubmit={handleSubmit}
          rowKey="id"
          type="form"
          columns={formColumns}
        />
      </DiyForm>
      <Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<API.User>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={formColumns}
          />
        )}
      </Drawer>
    </PageContainer >
  );
};

export default TableList;
