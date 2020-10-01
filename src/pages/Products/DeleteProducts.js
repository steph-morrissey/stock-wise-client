import React, { useEffect, useState, useContext } from 'react';
import { Row, Typography, Col } from 'antd';
import axios from 'axios';
import { PRODUCTS_URI } from '../../api/constants';
import UserContext from '../../UserContext';

import Loading from '../../components/Loading';
import AlertSuccess from '../../components/AlertSuccess';
import RenderProductCards from '../../components/RenderProductCards';

const { Title } = Typography;

export const DeleteProducts = () => {
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
      await axios.delete(`${PRODUCTS_URI}/${id}`, {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Row justify='center' align='middle'>
        <Col xs={20} sm={18} lg={10}>
          <>
            <AlertSuccess
              alertMessage='Product successfully deleted.'
              success={success}
              onClose={onClose}
            />
            <Title level={2}>Delete a Product</Title>
            <RenderProductCards items={products} handleEvent={handleDelete} />
          </>
        </Col>
      </Row>
    </>
  );
};
