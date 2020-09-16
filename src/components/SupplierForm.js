import React, { useState } from 'react';
import { Form, Input, Radio } from 'antd';

const SupplierForm = () => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout='horizontal'
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label='Form Size' name='size'>
          <Radio.Group>
            <Radio.Button value='small'>Small</Radio.Button>
            <Radio.Button value='default'>Default</Radio.Button>
            <Radio.Button value='large'>Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
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
      </Form>
    </>
  );
};

export default SupplierForm;
