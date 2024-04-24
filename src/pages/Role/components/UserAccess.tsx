import React, { PropsWithChildren } from 'react';
import { Checkbox, Col, Row } from 'antd';
interface UserAccessProps {
  userData: API.User[];
  onChange: () => void;
}

const UserAccess: React.FC<PropsWithChildren<UserAccessProps>> = (props) => {
  const { userData, onChange } = props
  return (
    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
      {userData.map((item) => (
        <Row key={item.id} justify="space-between">
          <Col span={8}>
            <span>{item.name}</span><span>({item.nickName})</span>
          </Col>
          <Col span={8}>
            <Checkbox value={item.id}></Checkbox>
          </Col>
        </Row>
      ))}
    </Checkbox.Group>
  );
};

export default UserAccess;

