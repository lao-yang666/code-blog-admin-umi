/*
 * @Description: Git 更新日志
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-11 09:54:01
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-11 10:00:17
 */
import { useRequest } from 'ahooks'
import { Space, Timeline, Typography } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react'
import { isSuccess } from '@/utils'

const { Text } = Typography;

const GitCommitLog: FC = () => {
  // dayjs 相对时间
  dayjs.extend(relativeTime);
  /**
 * @description: 请求项目 commit 日志
 * @author: 白雾茫茫丶
 */
  const { data: commitList } = useRequest(
    async () => {
      const response = await fetch('https://api.github.com/repos/lao-yang666/code-blog-admin-umi/commits?page=1&per_page=5')
      if (isSuccess(response.status)) {
        const result = await response.json()
        return result
      }
      return []
    })
  return (
    <Timeline style={{ marginTop: '20px' }}
      items={
        commitList?.map((item) => {
          return {
            children: (
              <Space direction="vertical" size={0} style={{ display: 'flex' }}>
                <a onClick={() => window.open(item.html_url)}>
                  {item.commit.message}
                </a>
                <Text type="secondary">{dayjs(item.commit.author.date).fromNow()}</Text>
              </Space>
            ),
          }
        })
      }
    />
  )
}
export default GitCommitLog