import React, { useEffect, useState, useContext } from 'react';
import { Card, Spin, Form, Input, Button, Row, Col } from 'antd';
import axios from 'axios';
import { PRODUCTS_URI } from '../api/constants';

import UserContext from '../UserContext';

const UpdateProducts = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [products, setProducts] = useState('');
  const [newProduct, setNewProduct] = useState('');
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
    const product = Object.values(values)[0];
    console.log(values);
    const payload = Object.keys(values).map((item, index) => {
    });
    console.log(payload);

    await axios.put(
      `${PRODUCTS_URI}/${id}`,
      { name: product },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
    getProducts();
    setLoading(false);
    setUpdateProduct(false);
  };

  const RenderProductCards = ({ items }) => {
    return items.map((item) => {
      return (
        <div className='site-card-border-less-wrapper'>
          <Card
            key={item._id}
            title={item.name}
            bordered={false}
            extra={
              <a key={item._id} id={item._id} onClick={handleUpdate}>
                edit
              </a>
            }
          >
            <p>Status: {item.status}</p>
            <p>Cost Price: {item.costPrice}</p>
            <p>Selling Price: {item.sellingPrice}</p>
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
              <RenderProductCards items={products} />
            </>
          </Col>
        </Row>
      </>
    );
  }

  if (loading && updateProduct) {
    return (
      <Form
        name='updateProduct'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item label='Product Name' name={newProduct.name}>
          <Input type='text' placeholder={newProduct.name} />
        </Form.Item>
        <Form.Item label='Category' name={newProduct.categoryId}>
          <Input type='text' placeholder={newProduct.categoryId} />
        </Form.Item>
        <Form.Item label='Cost Price' name={newProduct.costPrice}>
          <Input type='text' placeholder={newProduct.costPrice} />
        </Form.Item>
        <Form.Item label='Selling Price' name={newProduct.sellingPrice}>
          <Input type='text' placeholder={newProduct.sellingPrice} />
        </Form.Item>
        <Form.Item label='Supplier' name={newProduct.supplierId}>
          <Input type='text' placeholder={newProduct.supplierId} />
        </Form.Item>
        <Button htmlType='submit'>Submit</Button>
      </Form>
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
