import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { List, Typography, Row, Col } from 'antd';
import { CATEGORIES_URI } from '../../api/constants';

import UserContext from '../../UserContext';

import Loading from '../../components/Loading';
import AlertSuccess from '../../components/AlertSuccess';

const { Title } = Typography;

export const DeleteCategories = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const getCategories = async () => {
    const { data } = await axios.get(CATEGORIES_URI, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setCategories(data);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await getCategories();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        if (err) throw error;
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    try {
      await axios.delete(`${CATEGORIES_URI}/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      await getCategories();
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
              alertMessage='Category successfully deleted.'
              success={success}
              onClose={onClose}
            />
            <Title level={2}>Delete a Category</Title>
            <List
              size='large'
              bordered
              dataSource={categories}
              itemLayout='horizontal'
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <button
                      key='item._id'
                      id={item._id}
                      style={{ backgroundColor: '#150B41', color: '#FFF' }}
                      onClick={handleDelete}
                    >
                      delete
                    </button>,
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
