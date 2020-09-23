import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import { Card, Button, Row, Col, Spin } from 'antd';
import { PRODUCTS_URI } from '../api/constants';
export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState('');
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

  const RenderProductCards = ({ items }) => {
    return items.map((item) => {
      return (
        <div className='site-card-border-less-wrapper'>
          <Card
            key={item._id}
            title={item.name}
            bordered={false}
            extra={<Button type='primary'>Low In Stock</Button>}
          >
            <p>Status: {item.status}</p>
            <p>Cost Price: {item.costPrice}</p>
            <p>Selling Price: {item.sellingPrice}</p>
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
