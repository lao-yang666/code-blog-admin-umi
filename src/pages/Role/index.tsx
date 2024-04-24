import services from '@/services/api';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Switch, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import DiyForm from '@/components/DiyForm';
import StaffAuthorizationModal from '@/components/Modals/StaffAuthorizationModal';
const { roleGetUserAccessByid, modifyRoleStatus, roleControllerCreateRole: addRole, roleControllerGetRoles: queryRoleList, roleControllerDeleteRole: deleteRole, roleControllerUpdateRole: modifyRole } =
  services.jiaoseguanli;

const { userControllerGetSelUserList: queryUserList } = services.yonghuguanli;

/**
 * 添加
 * @param fields
 */
const handleAdd = async (fields: API.RoleNew) => {
  const hide = message.loading('正在添加');
  try {
    await addRole({ ...fields });
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
const handleUpdate = async (fields: API.Role) => {
  const hide = message.loading('正在修改');
  try {
    await modifyRole(
      { id: fields.id },
      { ...fields }
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
 *  开启/禁用
 * @param fields
 */
const handleSwitch = async (id: number, status: number) => {
  const hide = message.loading('正在修改');
  try {
    await modifyRoleStatus(
      id, status
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
const handleDel = async (id: number) => {
  if (!id) return;
  const hide = message.loading('正在删除');
  try {
    await deleteRole({ id });
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
  const [userAceessModalVisible, handleUserAceessModalVisible] = useState<boolean>(false);
  const [params, setParams] = useState({});
  const [tableAction, handleTableAction] =
    useState<string>('add');
  const [currentRecord, setCurrentRecord] = useState<API.Role>({} as any);
  const [userList, setUserList] = useState<API.User[]>([]);
  const [checkUser, setCheckUser] = useState<API.UserControllerGetUserByIdParams[]>([]);
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const queryRoleUserAccess = (id: number) => {
    roleGetUserAccessByid({ id }).then((res) => {
      if (res.code === 200) {
        const userData = res.data.User;
        const userIds = userData.map((item: API.User) => item.id)
        setCheckUser(userIds)
      }
    })
  }

  const columns: ProColumns<API.Role>[] = [
    {
      title: '角色名称',
      dataIndex: 'role_name',
      initialValue: currentRecord?.role_name,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '角色名称为必填项',
          },
        ],
      },
    },
    {
      title: '角色编码',
      dataIndex: 'role_code',
      valueType: 'text',
      hideInSearch: true,
      fieldProps: {
        disabled: !!currentRecord.id,
      },
      initialValue: currentRecord?.role_code,
    },
    {
      title: '描述',
      dataIndex: 'describe',
      valueType: 'text',
      hideInSearch: true,
      initialValue: currentRecord?.describe,
    },
    {
      title: '创建者',
      dataIndex: 'founder',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      initialValue: currentRecord?.founder,
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'text',
      hideInSearch: true,
      initialValue: currentRecord?.sort,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: !!currentRecord.id,
      initialValue: currentRecord?.status ? String(currentRecord?.status) : '',
      valueEnum: {
        '1': { text: '启用', status: '启用' },
        '0': { text: '禁用', status: '禁用' },
      },
      render: (_, record) => (
        <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={record.status === 1} onChange={(checked) => {
          handleSwitch(record.id, checked ? 1 : 0)
        }} />
      )
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              queryRoleUserAccess(record.id)
              setCurrentRecord(record);
              handleUserAceessModalVisible(true)
            }}
          >
            分配人员
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleModalVisible(true);
              setCurrentRecord(record);
            }}
          >
            分配菜单
          </a>
          <Divider type="vertical" />
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
    }else{
      Object.assign(value, { founder: initialState?.userInfo?.id ? String(initialState?.userInfo?.id) : '' })
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
    console.log(changedValues, allValues, '===');
  };

  useEffect(() => {
    queryUserList().then((res) => {
      if (res.code === 200) {
        setUserList(res.data)
        console.log(userList, '==');

      }
    })
  }, [])
  return (
    <PageContainer
      header={{
        title: '角色管理',
      }}
    >
      <ProTable<API.Role>
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
            onClick={() => { handleModalVisible(true); handleTableAction('add'); setCurrentRecord({}) }}
          >
            新增角色
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryRoleList({
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
        columns={columns}
      />
      <DiyForm title={tableAction === 'edit' ? '编辑角色' : '新增角色'} modalVisible={modalVisible} onCancel={() => handleModalVisible(false)}>
        <ProTable<API.Role>
          onSubmit={handleSubmit}
          type='form'
          rowKey="id"
          columns={columns}
        />
      </DiyForm>
      <StaffAuthorizationModal
        title={<div><span>分配人员</span><span style={{ color: 'red' }}>{currentRecord.role_name}</span><span>角色</span></div>}
        role_id={currentRecord.id}
        checkData={checkUser}
        userData={userList}
        modalVisible={userAceessModalVisible}
        onChange={(val: API.UserControllerGetUserByIdParams[]) => { setCheckUser(val) }}
        onCancel={() => handleUserAceessModalVisible(false)}>
      </StaffAuthorizationModal>
    </PageContainer >
  );
};

export default TableList;
