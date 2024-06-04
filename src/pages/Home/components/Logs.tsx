import services from '@/services/api';
import { Table, Tag } from "antd"
import type { TablePaginationConfig, TableProps } from 'antd';
import { randomTagColor } from '@/utils';
import { useEffect, useState } from 'react';

const { logControllerGetlogList: queryLogsList } = services.logs

const Logs: React.FC = () => {
  const [logData, changeLogData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const columns: TableProps<API.Logs>['columns'] = [
    {
      title: '账户',
      dataIndex: 'user_id',
      width: 100,
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'content',
      ellipsis: true,
      width: 100,
      align: 'center',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      width: 100,
      align: 'center',
    },
    {
      title: '路由',
      dataIndex: 'path',
      ellipsis: true,
      width: 100,
      align: 'center',
      render: (_, record) => {
        const url = new URL(record.path)
        return url.pathname
      },
    },
    {
      title: '接口',
      dataIndex: 'api_url',
      ellipsis: true,
      width: 100,
      align: 'center',
    },
    {
      title: '方法',
      dataIndex: 'method',
      width: 100,
      align: 'center',
      render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
    },
  ]
  const getLogsData = async () => {
    try {
      const params = {
        pageSize: pagination.pageSize,
        current: pagination.current,
      }
      const res = await queryLogsList(params)
      const { list, total } = res.data // 获取列表数据
      setPagination({ ...params, total: total });
      changeLogData(list)
    } catch (error) {
      console.log(error);
    }
  }

  const handleTableChange = (page: TablePaginationConfig) => {
    setPagination({ current: page.current ?? 1, pageSize: page.pageSize ?? 10, total: pagination.total });
  }

  useEffect(() => {
    getLogsData()
  }, [pagination.current, pagination.pageSize])
  return (<Table<API.Logs>  size='middle' dataSource={logData} columns={columns} pagination={pagination} onChange={handleTableChange} />)

}

export default Logs