import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Row, Col } from 'antd';
import axios from 'axios';
import UserContext from '../UserContext';
import { SUPPLIERS_URI } from '../api/constants';

export const Supplier = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState('');
  const [error, setError] = useState('');

  const { id }  = useParams();

  const getProductsBySupplier = async () => {
    const { data } = await axios.get(`${SUPPLIERS_URI}/${id}/products`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setProducts(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProductsBySupplier();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        if (err) throw error;
      }
    };
    fetchData();
  }, []);

  if (!loading) {
    console.log(products);
    return <div>All Suppliers</div>;
  }
  return (
    <Row justify='center' align='middle' style={{ height: '80vh' }}>
      <Col>
        <Spin tip='Loading...'></Spin>
      </Col>
    </Row>
  );
};
