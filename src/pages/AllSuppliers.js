import React, { useState, useEffect, useContext } from 'react';
import { Spin, Row, Col } from 'antd';
import axios from 'axios';
import UserContext from '../UserContext';
import { SUPPLIERS_URI } from '../api/constants';

export const AllSuppliers = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState('');
  const [error, setError] = useState('');

  const getSuppliers = async () => {
    const { data } = await axios.get(SUPPLIERS_URI, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setSuppliers(data);
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        await getSuppliers();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        if (err) throw error;
      }
    };
    fetchSuppliers();
  }, []);
  if (!loading) {
    console.log(suppliers);
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
