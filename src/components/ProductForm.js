import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  Select,
  Button,
  Alert,
  Typography,
  Spin,
  Row,
  Col,
} from 'antd';
import { CATEGORIES_URI, SUPPLIERS_URI, PRODUCTS_URI } from '../api/constants';

import UserContext from '../UserContext';

const { Title } = Typography;

const ProductForm = () => {
  const formRef = useRef(null);
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState('');
  const [suppliers, setSuppliers] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
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

  const onFinish = async (values) => {
    try {
      const { data: product } = await axios.post(PRODUCTS_URI, values, {
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

  if (!loading) {
    return (
      <>
        <Row justify='center' align='middle' style={{ height: '100vh' }}>
          <Col xs={20} sm={18} lg={10}>
            <div style={{ padding: '10px' }}>
              {success ? (
                <Alert
                  message='Product successfully added'
                  type='success'
                  closeText='OK'
                  onClose={onClose}
                />
              ) : null}
            </div>
            <h1>Add a Product</h1>
            <Form layout='horizontal' onFinish={onFinish} ref={formRef}>
              <Form.Item name='categoryId' label='Category'>
                <Dropdown
                  items={categories}
                  onChange={handleOnCategoryChange}
                />
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
  }
  return (
    <Row justify='center' align='middle' style={{ height: '80vh' }}>
      <Col>
        <Spin tip='Loading...'></Spin>
      </Col>
    </Row>
  );
};

export default ProductForm;
