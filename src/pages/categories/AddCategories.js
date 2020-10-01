import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import { CATEGORIES_URI } from '../../api/constants';

import UserContext from '../../UserContext';

import AlertSuccess from '../../components/AlertSuccess';

const { Title } = Typography;

export const AddCategories = () => {
  const { user } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    try {
      await axios.post(CATEGORIES_URI, values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      setSuccess(true);
    } catch (err) {
      setError(err);
      if (err) throw error;
    }
  };

  const onClose = () => {
    setSuccess(false);
  };

  return (
    <>
      <Row justify='center' align='middle' style={{ height: '80vh' }}>
        <Col xs={20} sm={18} lg={10}>
          <div style={{ padding: '10px' }}>
            <AlertSuccess
              alertMessage='Category successfully added.'
              success={success}
              onClose={onClose}
            />
          </div>
          <Title level={2}>Add a Category</Title>
          <Form layout='horizontal' onFinish={onFinish}>
            <Form.Item name='name' label='Category Name'>
              <Input type='text' />
            </Form.Item>
            <Row>
              <Col
                span={24}
                style={{
                  textAlign: 'right',
                }}
              >
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ backgroundColor: '#150B41', color: '#FFF' }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};
