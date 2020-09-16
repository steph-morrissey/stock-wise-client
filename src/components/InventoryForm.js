import React, { useState } from 'react';
import { Form, Input, Radio, Select } from 'antd';

const InventoryForm = () => {
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
        <Form.Item label='Category'>
          <Select>
            <Select.Option value='spirits'>Spirits</Select.Option>
            <Select.Option value='beers'>Beers</Select.Option>
            <Select.Option value='wines'>Wines</Select.Option>
            <Select.Option value='softs'>Softs</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Supplier'>
          <Select>
            <Select.Option value='lwc'>LWC</Select.Option>
            <Select.Option value='hammonds'>Hammonds</Select.Option>{' '}
          </Select>
        </Form.Item>
        <Form.Item label='Product Name'>
          <Input />
        </Form.Item>
        <Form.Item label='Cost Price'>
          <Input />
        </Form.Item>
        <Form.Item label='Selling Price'>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default InventoryForm;
