import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { REGISTER_URL } from '../api/constants';

import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const onLastName = (event) => {
    setLastName(event.target.value);
  };

  const onSubmit = async () => {
    const {
      data: { success, message },
    } = await axios.post(REGISTER_URL, {
      email,
      password,
      firstName,
      lastName,
    });

    if (success) {
      setRegistrationSuccess(true);
    }

    setStatusMessage(message);
  };

  return (
    <>
      <div>
        <Row justify='center'>
          <Col span={8}>
            <h1>Register</h1>
            <Form name='register_user' className='login-form'>
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
                  value={firstName}
                  onChange={onFirstName}
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
                  value={lastName}
                  onChange={onLastName}
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
      <div>
        {registrationSuccess && <Link to='/login'>Go to login here!</Link>}
      </div>
    </>
  );
};
