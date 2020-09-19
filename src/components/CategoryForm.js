import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

const CategoryForm = () => {
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
            <Form.Item label='Category Name'>
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

export default CategoryForm;
