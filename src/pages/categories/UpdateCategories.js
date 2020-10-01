import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { List, Form, Input, Button, Alert, Typography, Row, Col } from 'antd';
import { CATEGORIES_URI } from '../../api/constants';

import UserContext from '../../UserContext';

import Loading from '../../components/Loading';

const { Title } = Typography;

export const UpdateCategories = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [updateCategory, setUpdateCategory] = useState(false);
  const [categories, setCategories] = useState('');
  const [newCategory, setNewCategory] = useState('');
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

  const handleUpdate = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    const { data } = await axios.get(`${CATEGORIES_URI}/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setNewCategory(data);
    setLoading(false);
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
    setSuccess(true);
  };

  const onClose = () => {
    setSuccess(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (updateCategory) {
    return (
      <Row justify='center' align='middle' style={{ height: '80vh' }}>
        <Col xs={20} sm={18} lg={10}>
          <Title level={2}>Edit Category</Title>
          <Form name='updateCategory' onFinish={onFinish}>
            <Form.Item label='Category Name:' name='categoryName'>
              <Input type='text' placeholder={newCategory.name} />
            </Form.Item>
            <Button htmlType='submit'>Submit</Button>
          </Form>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row justify='center' align='middle' style={{ height: '80vh' }}>
        <Col xs={20} sm={18} lg={10}>
          <>
            {success ? (
              <Alert
                message='Category successfully updated'
                type='success'
                closeText='OK'
                onClose={onClose}
              />
            ) : null}
            <Title level={2}>Update a Category</Title>
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
                      onClick={handleUpdate}
                    >
                      edit
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
