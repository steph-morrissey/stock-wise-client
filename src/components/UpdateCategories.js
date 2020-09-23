import React, { useEffect, useState, useContext } from 'react';
import {
  List,
  Spin,
  Form,
  Input,
  Button,
  Alert,
  Typography,
  Row,
  Col,
} from 'antd';
import axios from 'axios';
import { CATEGORIES_URI } from '../api/constants';

import UserContext from '../UserContext';

const { Title } = Typography;

const UpdateCategories = () => {
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
    setSuccess(true);
  };

  const onClose = () => {
    setSuccess(false);
  };

  if (!loading && !updateCategory) {
    return (
      <>
        <Row justify='center' align='middle'>
          <Col span={20}>
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
      <Row justify='center' align='middle'>
        <Col span={20}>
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
    <Row justify='center' align='middle' style={{ height: '80vh' }}>
      <Col>
        <Spin tip='Loading...'></Spin>
      </Col>
    </Row>
  );
};

export default UpdateCategories;
