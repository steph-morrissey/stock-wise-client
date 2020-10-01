import React, { useEffect, useState, useContext } from 'react';
import { List, Spin, Alert, Row, Col } from 'antd';
import axios from 'axios';
import { CATEGORIES_URI } from '../api/constants';

import UserContext from '../UserContext';
const DeleteCategory = () => {
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

  if (!loading) {
    return (
      <>
        <Row justify='center' align='middle'>
          <Col span={20}>
            <>
              {success ? (
                <Alert
                  message='Category successfully deleted'
                  type='success'
                  closeText='OK'
                  onClose={onClose}
                />
              ) : null}
              <List
                size='large'
                bordered
                dataSource={categories}
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
  }
  return (
    <Row justify='center' align='middle' style={{ height: '80vh' }}>
      <Col>
        <Spin tip='Loading...'></Spin>
      </Col>
    </Row>
  );
};

export default DeleteCategory;
