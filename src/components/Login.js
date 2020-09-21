import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import { LOGIN_URL } from '../api/constants';

import { Form, Input, Button, Row, Col, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const Login = () => {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(LOGIN_URL, values);

      setUser(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div>
        <Row justify='center' align='middle' style={{ height: '100vh' }}>
          <Col xs={20} sm={10} lg={8}>
            <h1>Login</h1>
            <Form name='user_login' className='login-form' onFinish={onFinish}>
              <Form.Item
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Email'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type='danger'
                  className='login-form-button'
                  htmlType='submit'
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            {error ? <Alert message={error} type='error' /> : null}
          </Col>
        </Row>
      </div>
    </>
  );
};
