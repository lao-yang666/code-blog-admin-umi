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
import { useModel } from '@umijs/max';
import AccessButton from '@/components/AccessButton';
const { roleControllerGetSelRoleList: getRoleOption } = services.jiaoseguanli;
const { menuControllerCreateMenu: addMenu, menuControllerGetSelMenuList: queryMenuList, menuControllerDeleteMenu: deleteMenu, menuControllerUpdateMenu: modifyMenu } =
  services.caidanguanli;

const permissionEnum: Record<string, any> = {
  '0': { text: '只读', status: '只读', key: 'read' },
  '1': { text: '读写', status: '读写', key: 'write' },
  '2': { text: '新增', status: '新增', key: 'new' },
  '3': { text: '删除', status: '删除', key: 'delete' },
  '4': { text: '详情', status: '详情', key: 'detail' },
  '5': { text: '编辑', status: '编辑', key: 'edit' },
  '6': { text: '上传', status: '上传', key: 'upload' },
  '7': { text: '下载', status: '下载', key: 'download' },
}
/**
 * 添加
 * @param fields
 */
const handleAdd = async (fields: API.MenuNew) => {
  if (typeof fields.permissionList !== 'string') {
    const permissionList = fields.permissionList?.map((item: string) => {
      return permissionEnum[item]
    })
    fields.permissionList = JSON.stringify(permissionList)
  } else {
    fields.permissionList = undefined
  }
  const hide = message.loading('正在添加');
  try {
    await addMenu({ ...fields });
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
/**
 * 更新
 * @param fields
 */
const handleUpdate = async (fields: API.Menu) => {
  const hide = message.loading('正在修改');
  try {
    await modifyMenu(
      { id: fields.menu_id },
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
 *  删除
 * @param selectedRows
 */
const handleDel = async (id: string | undefined) => {
  if (!id) return;
  const hide = message.loading('正在删除');
  try {
    await deleteMenu({ id });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const getRoleList = async () => {
  const { data } = await getRoleOption();
  return (data ?? []).map((item: API.Role) => ({
    label: item.role_name,
    value: item.id,
  }))
};


const TableList: React.FC<unknown> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [params, setParams] = useState({});
  const [tableAction, handleTableAction] =
    useState<string>('add');
  const [currentRecord, setCurrentRecord] = useState<API.Menu>({} as any);
  const [parentId, setParentId] = useState<number>();
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.Menu>();
  const { initialState } = useModel('@@initialState');
  const formColumns: ProColumns<API.Menu>[] = [
    {
      title: '菜单名称',
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
      title: '父级菜单标识',
      dataIndex: 'parent_id',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: !parentId,
      fieldProps: {
        disabled: true,
      },
      initialValue: parentId,
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      valueType: 'text',
      hideInSearch: true,
      initialValue: currentRecord?.path,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '路由地址为必填项',
          },
        ],
      },
    },
    {
      title: '组件地址',
      dataIndex: 'component',
      valueType: 'text',
      hideInSearch: true,
      initialValue: currentRecord?.component,
    },
    {
      title: '重定向地址',
      dataIndex: 'redirect',
      hideInSearch: true,
      initialValue: currentRecord?.redirect,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      initialValue: currentRecord?.icon,
      render: () => '********',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      initialValue: !!currentRecord.menu_id ? String(currentRecord.status) : '1',
      valueEnum: {
        '1': { text: '启用', status: '启用' },
        '0': { text: '禁用', status: '禁用' },
      },
    },
    {
      title: '是否隐藏子菜单以及自身',
      dataIndex: 'hideInMenu',
      hideInSearch: true,
      initialValue: !!currentRecord.menu_id && typeof currentRecord.hideChildrenInMenu === 'number' ? String(currentRecord.hideInMenu) : '1',
      valueEnum: {
        '0': { text: '是', status: '是' },
        '1': { text: '否', status: '否' },
      },
    },
    {
      title: '是否隐藏子菜单',
      dataIndex: 'hideChildrenInMenu',
      hideInSearch: true,
      initialValue: !!currentRecord.menu_id && typeof currentRecord.hideChildrenInMenu === 'number' ? String(currentRecord.hideChildrenInMenu) : '1',
      valueEnum: {
        '0': { text: '是', status: '是' },
        '1': { text: '否', status: '否' },
      },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
      hideInTable: true,
      initialValue: currentRecord.sort,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '排序为必填项',
          },
        ],
      },
    },
    {
      title: '元数据',
      dataIndex: 'meta',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      initialValue: currentRecord?.meta,
    },
    {
      title: '额外配置',
      dataIndex: 'extraProperties',
      initialValue: currentRecord?.extraProperties,
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '权限配置',
      dataIndex: 'permissionList',
      initialValue: ['0', '1'],
      valueType: 'checkbox',
      hideInForm: tableAction === 'edit',
      hideInSearch: true,
      hideInTable: true,
      valueEnum: permissionEnum,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '至少配置一个初始权限',
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
          <AccessButton hidedivider={true} permission_key='system-menu-newchild' type='link' onClick={async () => {
            handleModalVisible(true);
            setParentId(record.menu_id);
            setCurrentRecord({} as any);
            handleTableAction('add')
          }}>
            新增子菜单
          </AccessButton>
          <AccessButton permission_key='system-menu-edit' type='link' onClick={() => {
            handleModalVisible(true);
            setCurrentRecord(record);
            handleTableAction('edit')
            if (record.parent_id) {
              setParentId(record.parent_id)
            } else {
              setParentId(undefined)
            }
          }}
          >
            编辑
          </AccessButton>
          <AccessButton permission_key='system-menu-delete' type='link' onClick={async () => {
            await handleDel(String(record.menu_id))
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
      Object.assign(value, { menu_id: currentRecord.menu_id })
    } else {
      Object.assign(value, { founder: initialState?.userInfo?.id })
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
        title: '菜单管理',
      }}
    >
      <ProTable<API.Menu>
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
            permission_key='system-menu-new'
            key='1'
            type="primary"
            onClick={() => { handleModalVisible(true); handleTableAction('add'); setCurrentRecord({} as any); setParentId(undefined) }}>
            新增菜单
          </AccessButton>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryMenuList();
          return {
            data: data || [],
            success,
            total: data?.total || 0,
          };
        }}
        columns={formColumns}
      />
      <DiyForm title={tableAction === 'edit' ? '编辑菜单' : '新增菜单'} modalVisible={modalVisible} onCancel={() => handleModalVisible(false)}>
        <ProTable<API.Menu>
          onSubmit={handleSubmit}
          rowKey="id"
          type="form"
          form={{ layout: 'horizontal' }}
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
          <ProDescriptions<API.Menu>
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
