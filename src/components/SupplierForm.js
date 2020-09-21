import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

const SupplierForm = () => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Row justify='center' align='middle' style={{ height: '100vh' }}>
        <Col span={10}>
          <Form
            labelCol={{
              span: 4,
            }}
            layout='horizontal'
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
          >
            <Form.Item label='Supplier Name'>
              <Input />
            </Form.Item>
            <Form.Item label='Phone Number'>
              <Input />
            </Form.Item>
            <Form.Item label='Address'>
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
            <Form.Item>
              <Button type='primary' danger>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SupplierForm;
