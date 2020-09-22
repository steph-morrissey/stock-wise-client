import React, { useEffect, useState, useContext } from 'react';
import { List, Spin, Row, Col } from 'antd';
import axios from 'axios';
import { CATEGORIES_URI } from '../api/constants';

import UserContext from '../UserContext';

const DeleteCategory = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState('');
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
      const { data } = await axios.delete(`${CATEGORIES_URI}/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      await getCategories();
    } catch (err) {
      setError(err.message);
      if (err) throw error;
    }
  };

  if (!loading) {
    return (
      <>
        <Row justify='center' align='middle'>
          <Col span={20}>
            <>
              <List
                size='large'
                header={<div>Categories</div>}
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
