import React, { useEffect, useState, useContext } from 'react';
import {
  Card,
  Spin,
  Form,
  Input,
  Button,
  Alert,
  Typography,
  Row,
  Col,
} from 'antd';
import axios from 'axios';
import { PRODUCTS_URI } from '../api/constants';

import UserContext from '../UserContext';

const { Title, Text } = Typography;

const UpdateProducts = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [products, setProducts] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const getProducts = async () => {
    const { data } = await axios.get(PRODUCTS_URI, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setProducts(data);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getProducts();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        if (err) throw error;
      }
    };
    fetchProducts();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    const { data } = await axios.get(`${PRODUCTS_URI}/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setNewProduct(data);
    setLoading(true);
    setUpdateProduct(true);
  };

  const onFinish = async (values) => {
    const id = newProduct._id;

    await axios.put(`${PRODUCTS_URI}/${id}`, values, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    getProducts();
    setLoading(false);
    setUpdateProduct(false);
    setSuccess(true);
  };

  const onClose = () => {
    setSuccess(false);
  };

  const RenderProductCards = ({ items }) => {
    return items.map((item) => {
      return (
        <div className='site-card-border-less-wrapper'>
          <Card
            key={item._id}
            title={<Title level={3}>{item.name}</Title>}
            bordered={false}
            extra={
              <a key={item._id} id={item._id} onClick={handleUpdate}>
                edit
              </a>
            }
          >
            <p>
              <Text strong>Status: </Text>
              {item.status}
            </p>
            <p>
              <Text strong>Cost Price: </Text>
              {item.costPrice}
            </p>
            <p>
              <Text strong>Selling Price: </Text> {item.sellingPrice}
            </p>{' '}
          </Card>
        </div>
      );
    });
  };

  if (!loading && !updateProduct) {
    return (
      <>
        <Row justify='center' align='middle'>
          <Col span={20}>
            <>
              {success ? (
                <Alert
                  message='Product successfully updated'
                  type='success'
                  closeText='OK'
                  onClose={onClose}
                />
              ) : null}
              <Title level={2}>Update a Product</Title>
              <RenderProductCards items={products} />
            </>
          </Col>
        </Row>
      </>
    );
  }

  if (loading && updateProduct) {
    return (
      <Row justify='center' align='middle'>
        <Col span={20}>
          <Title level={2}>Edit Product</Title>
          <Form
            name='updateProduct'
            initialValues={newProduct}
            onFinish={onFinish}
          >
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
        </Col>
      </Row>
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

export default UpdateProducts;
