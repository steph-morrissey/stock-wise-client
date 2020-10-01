import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { REGISTER_URL } from '../api/constants';

import { Form, Input, Button, Alert, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const Register = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    try {
      const {
        data: { success },
      } = await axios.post(REGISTER_URL, values);

      if (success) {
        setRegistrationSuccess(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div>
        <Row
          justify='center'
          align='middle'
          style={{ backgroundColor: '#FFF', height: '100vh' }}
        >
          <Col xs={20} sm={12} lg={8}>
            <h1>Register</h1>
            <Form
              name='register_user'
              className='login-form'
              onFinish={onFinish}
            >
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
                name='firstName'
                rules={[
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  type='text'
                  placeholder='First Name'
                />
              </Form.Item>
              <Form.Item
                name='lastName'
                rules={[
                  {
                    required: true,
                    message: 'Please input your last name!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  type='text'
                  placeholder='Last Name'
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
                  style={{ backgroundColor: '#150B41', color: '#FFF' }}
                  className='register-form-button'
                  htmlType='submit'
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        {error ? <Alert message={error} type='error' /> : null}
      </div>
      <div>
        {registrationSuccess && <Link to='/login'>Go to login here!</Link>}
      </div>
    </>
  );
};
