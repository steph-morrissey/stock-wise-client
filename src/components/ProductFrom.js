import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { CATEGORIES_URI, SUPPLIERS_URI } from '../api/constants';

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

  const Dropdown = ({ items }) => {
    console.log(items);
    return (
      <Select>
        {items.map((item) => {
          return (
            <Select.Option value={item._id} key={item._id}>
              {item.name}
            </Select.Option>
          );
        })}
      </Select>
    );
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
            >
              <Form.Item label='Category'>
                <Dropdown items={categories} />
              </Form.Item>
              <Form.Item label='Supplier'>
                <Dropdown items={suppliers} />
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
  }
  return null;
};

export default ProductForm;
