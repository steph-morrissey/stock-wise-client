import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';

const InventoryForm = () => {
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

export default InventoryForm;
