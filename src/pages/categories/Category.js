import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Spin, Row, Col, PageHeader } from 'antd';
import axios from 'axios';
import UserContext from '../../UserContext';
import { CATEGORIES_URI } from '../../api/constants';
import { ProductCards } from '../../components/ProductCards';

export const Category = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState('');
  const [error, setError] = useState('');

  const { id } = useParams();

  const getProductsByCategory = async () => {
    const { data } = await axios.get(`${CATEGORIES_URI}/${id}/products`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setProducts(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProductsByCategory();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        if (err) throw error;
      }
    };
    fetchData();
  }, []);

  if (!loading) {
    return (
      <div>
        <PageHeader title='Products' onBack={() => history.goBack()} />
        <Row
          style={{ display: 'flex', flexWrap: 'wrap' }}
          justify='center'
          align='middle'
        >
          <ProductCards items={products} />
        </Row>
      </div>
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
