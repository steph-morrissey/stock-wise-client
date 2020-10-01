import React, { useRef } from 'react';
import { Row, Col, Form, Input, Select, Button } from 'antd';

const ProductForm = ({
  formType,
  categories,
  suppliers,
  onFinish,
  newProduct,
}) => {
  const formRef = useRef(null);
  if (formType === 'addProduct') {
    const Dropdown = ({ items, onChange }) => {
      return (
        <Select onChange={onChange}>
          {items.map((item) => {
            return (
              <Select.Option
                key={item._id}
                name={item.name}
                label={item.name}
                value={item._id}
              >
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      );
    };

    const handleOnSupplierChange = (value) => {
      formRef.current.setFieldsValue({
        supplier: `ObjectId("${value}")`,
      });
    };

    const handleOnCategoryChange = (value) => {
      formRef.current.setFieldsValue({
        category: `ObjectId("${value}")`,
      });
    };

    return (
      <Form layout='horizontal' onFinish={onFinish} ref={formRef}>
        <Form.Item name='categoryId' label='Category'>
          <Dropdown items={categories} onChange={handleOnCategoryChange} />
        </Form.Item>
        <Form.Item name='supplierId' label='Supplier'>
          <Dropdown items={suppliers} onChange={handleOnSupplierChange} />
        </Form.Item>
        <Form.Item name='name' label='Product Name'>
          <Input type='text' />
        </Form.Item>
        <Form.Item name='costPrice' label='Cost Price'>
          <Input type='text' />
        </Form.Item>
        <Form.Item name='sellingPrice' label='Selling Price'>
          <Input type='text' />
        </Form.Item>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'right',
            }}
          >
            <Button
              type='primary'
              htmlType='submit'
              style={{ backgroundColor: '#150B41', color: '#FFF' }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  if (formType === 'updateProduct') {
    return (
      <Form name='updateProduct' initialValues={newProduct} onFinish={onFinish}>
        <Form.Item label='Product Name' name='name'>
          <Input type='text' />
        </Form.Item>
        <Form.Item label='Category' name='categoryId'>
          <Input type='text' />
        </Form.Item>
        <Form.Item label='Cost Price' name='costPrice'>
          <Input type='text' />
        </Form.Item>
        <Form.Item label='Selling Price' name='sellingPrice'>
          <Input type='text' />
        </Form.Item>
        <Form.Item label='Supplier' name='supplierId'>
          <Input type='text' />
        </Form.Item>
        <Button htmlType='submit'>Submit</Button>
      </Form>
    );
  }
};

export default ProductForm;
