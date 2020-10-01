import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Row, Col, Typography } from 'antd';
import UserContext from '../../UserContext';
import ProductForm from '../../components/ProductForm';
import AlertSuccess from '../../components/AlertSuccess';
import Loading from '../../components/Loading';
import {
  CATEGORIES_URI,
  SUPPLIERS_URI,
  PRODUCTS_URI,
} from '../../api/constants';

const { Title } = Typography;

export const AddProducts = () => {
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

  const onClose = () => {
    setSuccess(false);
  };

  const onFinish = async (values) => {
    try {
      await axios.post(PRODUCTS_URI, values, {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Row justify='center' align='middle' style={{ height: '80vh' }}>
        <Col xs={20} sm={18} lg={10}>
          <AlertSuccess
            alertMessage='Product successfully added.'
            success={success}
            onClose={onClose}
          />
          <Title level={2}>Add a Product</Title>
          <ProductForm
            formType='addProduct'
            categories={categories}
            suppliers={suppliers}
            onFinish={onFinish}
          />
        </Col>
      </Row>
    </>
  );
};
