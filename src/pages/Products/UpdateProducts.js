import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Typography, Row, Col } from 'antd';
import { PRODUCTS_URI } from '../../api/constants';
import ProductFrom from '../../components/ProductForm';
import UserContext from '../../UserContext';

import Loading from '../../components/Loading';
import AlertSuccess from '../../components/AlertSuccess';
import RenderProductCards from '../../components/RenderProductCards';

const { Title, Text } = Typography;

export const UpdateProducts = () => {
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
    console.log(id);
    const { data } = await axios.get(`${PRODUCTS_URI}/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setNewProduct(data);
    setLoading(false);
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

  if (loading) {
    return <Loading />;
  }

  if (updateProduct) {
    return (
      <Row justify='center' align='middle'>
        <Col xs={20} sm={18} lg={10}>
          <Title level={2}>Edit Product</Title>
          <ProductFrom
            formType='updateProduct'
            newProduct={newProduct}
            onFinish={onFinish}
          />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row justify='center' align='middle'>
        <Col xs={20} sm={18} lg={10}>
          <>
            <AlertSuccess
              alertMessage='Product successfully updated.'
              success={success}
              onClose={onClose}
            />
            <Title level={2}>Update a Product</Title>
            <RenderProductCards items={products} handleEvent={handleUpdate} />
          </>
        </Col>
      </Row>
    </>
  );
};
