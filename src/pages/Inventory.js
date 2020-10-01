import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import { Modal, Row, Col, Spin, PageHeader, Select } from 'antd';
import { PRODUCTS_URI } from '../api/constants';
import { ProductCards } from '../components/ProductCards';

const { Option } = Select;

export const Inventory = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
    setProducts(data.products);
    setFilteredProducts(data.products);
    setCategories(data.categories);
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
    setVisible(false);
  };

  const handleChange = (categoryId) => {
    if (categoryId) {
      setFilteredProducts(
        products.filter((each) => each.categoryId === categoryId),
      );
    } else {
      setFilteredProducts(products);
    }
  };

  if (!loading) {
    return (
      <div className='site-card-wrapper'>
        <Row align='middle' justify='center'>
          <PageHeader title='View Inventory' />
        </Row>
        <Row
          style={{ display: 'flex', flexWrap: 'wrap' }}
          justify='center'
          align='middle'
          style={{ margin: '10px' }}
        >
          <Select
            placeholder='Select a option and change input text above'
            onChange={handleChange}
            allowClear
            style={{ width: '50%' }}
          >
            {categories.map((category) => (
              <Option value={category._id}>{category.name}</Option>
            ))}
          </Select>
        </Row>
        <Row
          style={{ display: 'flex', flexWrap: 'wrap' }}
          justify='center'
          align='middle'
        >
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
          <ProductCards items={filteredProducts} showModal={showModal} />
        </Row>
      </div>
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
