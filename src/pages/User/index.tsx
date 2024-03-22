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

const { userControllerGetUserById: getUserDetail, userControllerCreateUser: addUser, userControllerGetUserList: queryUserList, userControllerDeleteDraft: deleteUser, userControllerUpdateUser: modifyUser } =
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
  const [tableAction, handleTableAction] =
    useState<string>('add');
  const [currentRecord, setCurrentRecord] = useState<API.User>({} as any);
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.User>();
  const formColumns: ProColumns<API.User>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      tip: '名称是唯一的 key',
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
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'text',
      initialValue: currentRecord?.nickName,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      initialValue: currentRecord?.gender,
      valueEnum: {
        0: { text: '男', status: '男' },
        1: { text: '女', status: '女' },
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      initialValue: currentRecord?.email,
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '邮箱为必填项',
          },
        ],
      },
    }
  ];
  const columns: ProColumns<API.UserNew>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      tip: '名称是唯一的 key',
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
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueEnum: {
        0: { text: '男', status: '男' },
        1: { text: '女', status: '女' },
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
      hideInSearch: true
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
              await handleDel(record.id)
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
  return (
    <PageContainer
      header={{
        title: '用户管理',
      }}
    >
      <ProTable<API.UserNew>
        actionRef={actionRef}
        rowKey="id"
        pagination={{
          pageSize: 10,
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
            onClick={() => { handleModalVisible(true); handleTableAction('add'); setCurrentRecord({}) }}
          >
            新增用户
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryUserList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
          return {
            data: data?.list || [],
            success,
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />
      <DiyForm title={tableAction === 'edit' ? '编辑用户' : '新增用户'} modalVisible={modalVisible} onCancel={() => handleModalVisible(false)}>
        <ProTable<API.UserNew, API.UserNew>
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
          <ProDescriptions<API.UserNew>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer >
  );
};

export default TableList;
