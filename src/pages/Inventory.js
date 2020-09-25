import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import { Modal, Card, Button, Typography, Row, Col, Spin } from 'antd';
import { PRODUCTS_URI } from '../api/constants';

const { Title } = Typography;

export const Inventory = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState('');
  const [error, setError] = useState('');
  const [reportedProductId, setReportedProductId] = useState('');
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState(
    'Report this product as Low In Stock?',
  );
  const [confirmLoading, setConfirmLoading] = useState(false);

  const getInventory = async () => {
    const { data } = await axios.get(PRODUCTS_URI, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setProducts(data);
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        await getInventory();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        if (err) throw error;
      }
    };
    fetchInventory();
  }, []);

  const showModal = (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    setReportedProductId(id);
    setVisible(true);
  };

  const handleOk = async () => {
    setModalText('Product has been reported as Low In Stock.');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);

    const id = reportedProductId;
    await axios.put(
      `${PRODUCTS_URI}/${id}`,
      { status: 'Low In Stock' },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );

    await getInventory();
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const RenderProductCards = ({ items }) => {
    return items.map((item) => {
      return (
        <>
          <Card
            key={item._id}
            title={item.name}
            bordered={false}
            style={{
              margin: '20px',
              backgroundColor: '#F6F9FE',
            }}
            id={item._id}
            extra={
              item.status !== 'Low In Stock' ? (
                <Button>
                  <a key={item._id} id={item._id} onClick={showModal}>
                    Low In Stock
                  </a>
                </Button>
              ) : null
            }
          >
            <p>Status: {item.status}</p>
            <p>Cost Price: {item.costPrice}</p>
            <p>Selling Price: {item.sellingPrice}</p>
          </Card>
        </>
      );
    });
  };

  if (!loading) {
    return (
      <>
        <Title level={2}>View Inventory</Title>
        <div className='site-card-wrapper'>
          <Row justify='center' align='middle'>
            <Col xs={20} sm={18} lg={12}>
              <>
                <Modal
                  title='Report as Low In Stock'
                  visible={visible}
                  okText='Yes'
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <p>{modalText}</p>
                </Modal>
                <RenderProductCards items={products} />
              </>
            </Col>
          </Row>
        </div>
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
