import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Row, Space, Typography } from 'antd'
import RenderContent from './components/RenderContent' // 顶部布局
import StatisticChart from './components/StatisticChart' // 指标卡片
import Logs from './components/Logs' // 指标卡片
import styles from './index.less';

const { Paragraph, Text } = Typography;

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
    <PageContainer ghost content={<RenderContent />}>
      <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: 16 }}>
        {/* 指标卡片 */}
        <div style={{ marginTop: '-12px' }} >
          <StatisticChart />
        </div>
        <Row gutter={16}>
          <Col span={14}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* 主要技术栈 */}
              <div className={styles.notice}></div>
              {/* 博客日志 */}
              <Logs />
            </Space>
          </Col>
          <Col span={10}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* 最新动态 */}
              <div className={styles.notice}></div>
              {/* Git 操作日志 */}
              <div className={styles.notice}></div>
            </Space>
          </Col>
        </Row>
      </Space>
    </PageContainer>
  );
};

export default HomePage;
