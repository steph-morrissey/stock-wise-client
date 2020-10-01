import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { List, Typography, Row, Col } from 'antd';
import { SUPPLIERS_URI } from '../../api/constants';

import Loading from '../../components/Loading';
import AlertSuccess from '../../components/AlertSuccess';

import UserContext from '../../UserContext';

const { Title } = Typography;

export const DeleteSuppliers = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState('');
  const [success, setSuccess] = useState(false);
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

  const handleDelete = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    try {
      await axios.delete(`${SUPPLIERS_URI}/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      await getSuppliers();
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
      <Row justify='center' align='middle' style={{ height: '80vh' }}>
        <Col xs={20} sm={18} lg={10}>
          <>
            <AlertSuccess
              alertMessage='Supplier successfully deleted.'
              success={success}
              onClose={onClose}
            />
            <Title level={2}>Delete a Supplier</Title>
            <List
              size='large'
              bordered
              dataSource={suppliers}
              itemLayout='horizontal'
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a key='item._id' id={item._id} onClick={handleDelete}>
                      delete
                    </a>,
                  ]}
                >
                  {item.name}
                </List.Item>
              )}
            />
          </>
        </Col>
      </Row>
    </>
  );
};
