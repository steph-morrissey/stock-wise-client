import React, { useState, useContext } from 'react';
import { Form, Input, Button, Alert, Typography, Row, Col } from 'antd';
import { CATEGORIES_URI } from '../api/constants';
import axios from 'axios';
import UserContext from '../UserContext';

const { Title } = Typography;

const CategoryForm = () => {
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
<<<<<<< HEAD
      <Row justify='center' align='middle' style={{ height: '100vh' }}>
        <Col span={10}>
=======
      <Row justify='center' align='middle' style={{ height: '80vh' }}>
        <Col xs={20} sm={18} lg={10}>
          <div style={{ padding: '10px' }}>
            {success ? (
              <Alert
                message='Category successfully added'
                type='success'
                closeText='OK'
                onClose={onClose}
              />
            ) : null}
          </div>
          <Title level={2}>Add a Category</Title>
>>>>>>> master
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
                <Button type='primary' htmlType='submit' danger>
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

export default CategoryForm;
