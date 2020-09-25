import React, { useState, useContext } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { CATEGORIES_URI } from '../api/constants';
import axios from 'axios';
import UserContext from '../UserContext';

const CategoryForm = () => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    try {
      await axios.post(CATEGORIES_URI, values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      setError(err);
      if (err) throw error;
    }
  };

  return (
    <>
      <Row justify='center' align='middle' style={{ height: '100vh' }}>
        <Col span={10}>
          <Form layout='horizontal' onFinish={onFinish}>
            <Form.Item name='name' label='Category Name'>
              <Input type='text' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' danger>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CategoryForm;
