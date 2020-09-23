import React, { useEffect, useState, useContext } from 'react';
import { List, Spin, Form, Input, Button, Row, Col } from 'antd';
import axios from 'axios';
import { CATEGORIES_URI } from '../api/constants';

import UserContext from '../UserContext';

const UpdateCategories = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [updateCategory, setUpdateCategory] = useState(false);
  const [categories, setCategories] = useState('');
  const [newCategory, setNewCategory] = useState('');
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

  const handleUpdate = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    const { data } = await axios.get(`${CATEGORIES_URI}/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setNewCategory(data);
    setLoading(true);
    setUpdateCategory(true);
  };

  const onFinish = async (values) => {
    const id = newCategory._id;
    const category = Object.values(values)[0];
    await axios.put(
      `${CATEGORIES_URI}/${id}`,
      { name: category },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
    getCategories();
    setLoading(false);
    setUpdateCategory(false);
  };

  if (!loading && !updateCategory) {
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
                      <a key='item._id' id={item._id} onClick={handleUpdate}>
                        edit
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

  if (loading && updateCategory) {
    return (
      <Form
        name='updateCategory'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item label={newCategory.name} name={newCategory.name}>
          <Input type='text' />
        </Form.Item>
        <Button htmlType='submit'>Submit</Button>
      </Form>
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

export default UpdateCategories;
