import React, { useState, useContext } from 'react';
import { Form, Input, Button, Alert, Typography, Row, Col } from 'antd';
import { SUPPLIERS_URI } from '../api/constants';
import axios from 'axios';
import UserContext from '../UserContext';

const { Title } = Typography;

const SupplierForm = () => {
  const { user } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    const { firstLine, secondLine, thirdLine, postcode } = values.address;
    const body = {
      name: values.name,
      details: {
        firstLine,
        secondLine,
        thirdLine,
        postcode,
        phone: values.phone,
      },
    };
    try {
      await axios.post(SUPPLIERS_URI, body, {
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
      <Row justify='center' align='middle' style={{ height: '100vh' }}>
        <Col xs={20} sm={18} lg={10}>
          <div style={{ padding: '10px' }}>
            {success ? (
              <Alert
                message='Supplier successfully added'
                type='success'
                closeText='OK'
                onClose={onClose}
              />
            ) : null}
          </div>
          <Title level={2}>Add a Supplier</Title>
          <Form layout='horizontal' onFinish={onFinish}>
            <Form.Item label='Supplier Name' name='name'>
              <Input type='text' />
            </Form.Item>
            <Form.Item label='Phone Number' name='phone'>
              <Input type='text' />
            </Form.Item>
            <Form.Item label='Address' name='address'>
              <Input.Group compact>
                <Form.Item
                  name={['address', 'firstLine']}
                  noStyle
                  rules={[
                    { required: true, message: 'Enter first line of address' },
                  ]}
                >
                  <Input placeholder='First line of address' />
                </Form.Item>
                <Form.Item
                  name={['address', 'secondLine']}
                  noStyle
                  rules={[
                    { required: true, message: 'Enter second line of address' },
                  ]}
                >
                  <Input placeholder='Second line of address' />
                </Form.Item>
                <Form.Item
                  name={['address', 'thirdLine']}
                  noStyle
                  rules={[{ required: false }]}
                >
                  <Input placeholder='Third line of address (optional)' />
                </Form.Item>
                <Form.Item
                  name={['address', 'postcode']}
                  noStyle
                  rules={[
                    { required: true, message: 'Please enter your postcode' },
                  ]}
                >
                  <Input style={{ width: '50%' }} placeholder='Postcode' />
                </Form.Item>
              </Input.Group>
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

export default SupplierForm;
