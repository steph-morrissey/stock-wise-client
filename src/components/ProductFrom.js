import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import {
  CATEGORIES_URI,
  SUPPLIERS_URI,
  ADD_PRODUCT_URI,
} from '../api/constants';

import UserContext from '../UserContext';

const ProductForm = () => {
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState('');
  const [suppliers, setSuppliers] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [
          axios.get(CATEGORIES_URI, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          axios.get(SUPPLIERS_URI, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
        ];
        const [{ data: categories }, { data: suppliers }] = await Promise.all(
          promises,
        );
        setCategories(categories);
        setSuppliers(suppliers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        if (err) throw error;
      }
    };
    fetchData();
  }, []);

  const handleOnChange = (value) => {
    console.log(value);
  };

  const Dropdown = ({ items }) => {
    return (
      <Select onChange={handleOnChange}>
        {items.map((item) => {
          return (
            <Select.Option
              key={item._id}
              name={item.name}
              label={item.name}
              value={item.name}
            >
              {item.name}
            </Select.Option>
          );
        })}
      </Select>
    );
  };

  const onFinish = async (values) => {
    try {
      console.log(values);
      const { data: product } = await axios.post(ADD_PRODUCT_URI, values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(product);
    } catch (err) {
      setError(err);
      if (err) throw error;
    }
  };

  if (!loading) {
    return (
      <>
        <Row justify='center' align='middle' style={{ height: '100vh' }}>
          <Col span={10}>
            <Form
              labelCol={{
                span: 4,
              }}
              layout='horizontal'
              onFinish={onFinish}
            >
              <Form.Item name='category' label='Category'>
                <Dropdown items={categories} />
              </Form.Item>
              <Form.Item name='supplier' label='Supplier'>
                <Dropdown items={suppliers} />
              </Form.Item>
              <Form.Item name='productName' label='Product Name'>
                <Input type='text' />
              </Form.Item>
              <Form.Item name='costPrice' label='Cost Price'>
                <Input type='text' />
              </Form.Item>
              <Form.Item name='sellingPrice' label='Selling Price'>
                <Input type='text' />
              </Form.Item>
              <Form.Item>
                <Button type='primary' danger htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
  return null;
};

export default ProductForm;
