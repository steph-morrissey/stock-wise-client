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
import { SUPPLIERS_URI } from '../api/constants';

import UserContext from '../UserContext';

const { Title } = Typography;

const UpdateSuppliers = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [updateSupplier, setUpdateSupplier] = useState(false);
  const [suppliers, setSuppliers] = useState('');
  const [newSupplier, setNewSupplier] = useState('');
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

  const handleUpdate = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    const { data } = await axios.get(`${SUPPLIERS_URI}/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setNewSupplier(data);
    setLoading(true);
    setUpdateSupplier(true);
  };

  const onFinish = async (values) => {
    const id = newSupplier._id;
    const supplier = Object.values(values)[0];
    await axios.put(
      `${SUPPLIERS_URI}/${id}`,
      { name: supplier },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
    getSuppliers();
    setLoading(false);
    setUpdateSupplier(false);
    setSuccess(true);
  };

  const onClose = () => {
    setSuccess(false);
  };

  if (!loading && !updateSupplier) {
    return (
      <>
        <Row justify='center' align='middle'>
          <Col span={20}>
            <>
              {success ? (
                <Alert
                  message='Product successfully updated'
                  type='success'
                  closeText='OK'
                  onClose={onClose}
                />
              ) : null}
              <Title level={2}>Update a Supplier</Title>
              <List
                size='large'
                header={<div>Suppliers</div>}
                bordered
                dataSource={suppliers}
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

  if (loading && updateSupplier) {
    return (
      <Row justify='center' align='middle'>
        <Col span={20}>
          <Title level={2}>Edit Supplier</Title>
          <Form name='updateSupplier' onFinish={onFinish}>
            <Form.Item label='Supplier Name:' name='supplierName'>
              <Input type='text' placeholder={newSupplier.name} />
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

export default UpdateSuppliers;
