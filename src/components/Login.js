import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
//import { Link } from 'react-router-dom';
import { LOGIN_URL } from '../api/constants';

import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const Login = () => {
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async () => {
    try {
      const { data } = await axios.post(LOGIN_URL, {
        email,
        password,
      });
      const { token } = data;

      setUser({ email, token });
    } catch (error) {
      if (error.response.data.message) {
        setStatusMessage(error.response.data.message);
      } else {
        setStatusMessage('Something went wrong with our servers!');
      }
    }
  };

  return (
    <>
      <div>
        <Row justify='center' align='middle'>
          <Col lg={8} md={8} sm={12} xs={24}>
            <h1>Login</h1>
            <Form name='normal_login' className='login-form'>
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
                  value={email}
                  onChange={onEmailChange}
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
                  value={password}
                  onChange={onPasswordChange}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                  onClick={onSubmit}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
      {statusMessage && <small>{statusMessage}</small>}
    </>
  );
};
