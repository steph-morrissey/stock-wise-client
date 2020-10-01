import React from 'react';
import { Row, Col, Spin } from 'antd';

const Loading = () => {
  return (
    <Row
      justify='center'
      align='middle'
      style={{ height: '80vh', color: '#FC760B' }}
    >
      <Col>
        <Spin tip='Loading...'></Spin>
      </Col>
    </Row>
  );
};

export default Loading;
