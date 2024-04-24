import services from '@/services/api';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Popconfirm, message } from 'antd';
import React, { useRef, useState } from 'react';
import { Link, history } from '@umijs/max';

const { postControllerGetPublishedPosts: queryPostList, postControllerDeleteManyPost: deleteManyPost,
  postControllerDeletePost: deletePost, postControllerCreateDraft: addDraft } =
  services.wenzhangguanli;

const { userControllerGetSelUserList: queryUserList } = services.yonghuguanli

/**
 *  批量删除
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.PostControllerDeleteDraftParams[]) => {
  console.log(selectedRows, '??????');
  const hide = message.loading('正在删除');
  if (!selectedRows.length) return true;
  try {
    await deleteManyPost(selectedRows);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

/**
 *  单个删除
 * @param selectedRows
 */
const handleDel = async (id: string | undefined) => {
  if (!id) return;
  const hide = message.loading('正在删除');
  try {
    await deletePost({ id });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleEdit = async (record: API.PostNew & API.PostControllerUpdatePostParams) => {
  const { title, content, authorId, authorName, draftId, published } = record
  if (!published) {
    history.push(`/Post/PostAdd?id=${record.id}`)
  } else if (draftId) {
    history.push(`/Post/PostAdd?id=${record.draftId}`)
  } else {
    try {
      const { data } = await addDraft({ title, content, authorId, authorName, postId: record.id ? Number(record.id) : undefined });
      history.push(`/Post/PostAdd?id=${data?.draftId}`)
      return true;
    } catch (error) {
      return false;
    }
  }

}

const getAuthorList = async () => {
  const { data } = await queryUserList();
  return (data ?? []).map((item: API.User) => ({
    label: item.name,
    value: item.id,
  }))
};

const TableList: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState({});
  const columns: ProColumns<API.Post>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '标题为必填项',
          },
        ],
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      hideInSearch: true,
      hideInTable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '内容为必填项',
          },
        ],
      },
    },
    {
      title: '发布状态',
      dataIndex: 'published',
      hideInForm: true,
      valueType: 'select',
      initialValue: '',
      fieldProps: {
        options: [
          {
            label: '全部',
            value: '',
          },
          {
            label: '已发布',
            value: true,
          },
          {
            label: '未发布',
            value: false,
          },
        ],
      },
    },
    {
      title: '发布时间',
      dataIndex: 'pubTime',
      hideInForm: true,
      hideInTable: true,
      valueType: 'dateTimeRange',
      colSize: 2,
    },
    {
      title: '最近更新时间',
      dataIndex: 'updated_time',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '作者',
      dataIndex: 'authorId',
      valueType: 'text',
      request: getAuthorList,
      renderText(text, record) {
        return record?.authorName;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {/* <Link to={`/Post/PostAdd?id=${record.id}`}>编辑</Link> */}
          <a
            onClick={() => {
              handleEdit(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Link to={`/Post/PostDetail?id=${record.id}`}>阅读</Link>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              await handleDel(record.id);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];
  const handleFormChange = (changedValues: any, allValues: any) => {
    setParams(allValues)
    console.log(changedValues, allValues);
  };
  return (
    <PageContainer
      header={{
        title: '文章管理',
      }}
    >
      <ProTable<API.Post>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
        form={
          { onValuesChange: handleFormChange }
        }
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
          // onClick={() => handleModalVisible(true)}
          >
            <Link to="/Post/PostAdd">新建</Link>
          </Button>,
        ]}
        params={params}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryPostList({
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
        tableAlertOptionRender={({ selectedRowKeys }: any) => <Popconfirm
          title="删除文章"
          description="一旦删除记录不可恢复,确定删除?"
          onConfirm={async () => { await handleRemove(selectedRowKeys); actionRef.current?.reloadAndRest?.(); }}
        >
          <Button danger>批量删除</Button>
        </Popconfirm>}
        rowSelection={{}}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;

