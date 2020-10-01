import React, { useEffect, useState, useContext } from 'react';
import { Card, Spin, Alert, Row, Typography, Col } from 'antd';
import axios from 'axios';
import { PRODUCTS_URI } from '../api/constants';

import UserContext from '../UserContext';

const { Text, Title } = Typography;

const DeleteProducts = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState('');
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

  const handleDelete = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    try {
      const { data } = await axios.delete(`${PRODUCTS_URI}/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      await getProducts();
      setSuccess(true);
    } catch (err) {
      setError(err.message);
      if (err) throw error;
    }
  };

  const onClose = () => {
    setSuccess(false);
  };

  const RenderProductCards = ({ items }) => {
    return items.products.map((item) => {
      return (
        <div className='site-card-border-less-wrapper'>
          <Card
            key={item._id}
            title={<Title level={3}>{item.name}</Title>}
            bordered={false}
            extra={
              <a key={item._id} id={item._id} onClick={handleDelete}>
                delete
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
            </p>
          </Card>
        </div>
      );
    });
  };

  if (!loading) {
    return (
      <>
        <Row justify='center' align='middle'>
          <Col span={20}>
            <>
              {success ? (
                <Alert
                  message='Product successfully deleted'
                  type='success'
                  closeText='OK'
                  onClose={onClose}
                />
              ) : null}
              <Title level={2}>Delete a Product</Title>
              <RenderProductCards items={products} />
            </>
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

export default DeleteProducts;
