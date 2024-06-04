/*
 * @Description: 顶部布局
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-08 14:47:00
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-20 09:09:49
 */
import { useModel } from '@umijs/max'
import { Avatar, Card, Col, Row, Space, Statistic, Typography } from 'antd';
import { get } from 'lodash-es'
import { FC, useEffect, useState } from 'react'
import avatorImg from '@/assets/img/avator.png'
import { isSuccess, timeFix, welcomeWords } from '@/utils'
import { MessageOutlined, PhoneOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// https://www.seniverse.com/
const apiKey = 'Sdcp14pKMKm0XNAMY' // 心知天气 密钥

const RenderContent: FC = () => {
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  const [weatherInfo, setWeatherInfo] = useState({});
  const getWeather = async () => {
    const response = await fetch(`https://api.seniverse.com/v3/weather/now.json?key=${apiKey}&location=ip`)
    if (isSuccess(response.status)) {
      const result = get(await response.json(), 'results.[0]')
      return result
    }
    return {}
  }
  useEffect(() => {
    getWeather().then(res => {
      console.log(res, '====')
      setWeatherInfo(res)
    })
  }, [])
  return (
    <Card>
      <Row justify="space-between" align="middle">
        <Col>
          <Row gutter={15} align="middle">
            <Col>
              <Avatar src={avatorImg} size={80} />
            </Col>
            <Col>
              <Title level={4}>{`${timeFix()}，${initialState?.userInfo?.nickName}，${welcomeWords()}`}</Title>
              <Paragraph>
                <PhoneOutlined className='pr-2' title='电话'/>
                <Text className='pr-6'>{initialState?.userInfo?.phone}</Text>
                <MessageOutlined className='pr-2' title='邮箱'/>
                <Text>{initialState?.userInfo?.email}</Text>
              </Paragraph>
              {weatherInfo && <Text type="secondary">
                {get(weatherInfo, 'location.name', '')}，
                今日天气{get(weatherInfo, 'now.text', '')}，{get(weatherInfo, 'now.temperature', 0)}℃！</Text>}
            </Col>
          </Row>
        </Col>
        <Col>
          <Space size="large">
            <Statistic title="项目数" value={86} />
            <Statistic title="团队内排名" value={56} suffix="/ 100" />
            <Statistic title="项目访问" value={7647} />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}
export default RenderContent