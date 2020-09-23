import React, { useEffect, useState, useContext } from 'react';
import { Card, Spin, Row, Col } from 'antd';
import axios from 'axios';
import { PRODUCTS_URI } from '../api/constants';

import UserContext from '../UserContext';

const DeleteProducts = () => {
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

  const handleDelete = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    try {
      const { data } = await axios.delete(`${PRODUCTS_URI}/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      await getProducts();
    } catch (err) {
      setError(err.message);
      if (err) throw error;
    }
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
              <a key={item._id} id={item._id} onClick={handleDelete}>
                delete
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

export default DeleteProducts;
