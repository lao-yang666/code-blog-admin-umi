import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Row, Space, Typography } from 'antd'
import RenderContent from './components/RenderContent' // 顶部布局
import QuickWayCard from './components/QuickWay'
import GitCommitLog from './components/GitCommitLog'
import StatisticChart from './components/StatisticChart'
import HotPost from './components/HotPost'
import Logs from './components/Logs'
import CardBoxWrap from '@/components/CardBoxWrap';
const { Paragraph, Text } = Typography;

const LogsCard = CardBoxWrap(Logs);
const HotPostCard = CardBoxWrap(HotPost);
const GitCommitLogCard = CardBoxWrap(GitCommitLog);
const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const { initialState } = useModel('@@initialState');

  // 渲染副标题
  const renderSecondary = (content: string, rows = 1) => {
    return (
      <Paragraph ellipsis={{
        rows,
        tooltip: {
          title: content,
          color: initialState?.Settings?.colorPrimary || 'blue',
        },
      }} style={{ marginBottom: 0 }}>
        <Text type="secondary">{content}</Text>
      </Paragraph>
    )
  }
  return (
    <PageContainer ghost content={<RenderContent />} header={undefined} title={false} className='page-container'>
      <StatisticChart></StatisticChart>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row gutter={16}>
          <Col span={14}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* 博客日志 */}
              <LogsCard title='操作日志' />
              {/* 博客日志 */}
              {/* <LogsCard title='操作日志' /> */}

            </Space>
          </Col>
          <Col span={10}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* 快捷入口 */}
              <HotPostCard title='最热文章' />
              {/* 提交日志 */}
              <GitCommitLogCard title='git提交日志' />
              {/* <QuickWayCard title='快捷入口' /> */}
            </Space>
          </Col>
        </Row>
      </Space>
    </PageContainer>
  );
};

export default HomePage;
