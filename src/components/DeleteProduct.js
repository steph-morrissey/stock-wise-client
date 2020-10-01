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



  if (!loading) {

    );
  }

};

export default DeleteProducts;
