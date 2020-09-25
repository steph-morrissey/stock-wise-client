import React, { useEffect, useState, useContext } from "react";
import { List, Spin, Alert, Typography, Row, Col } from "antd";
import axios from "axios";
import { SUPPLIERS_URI } from "../api/constants";

import UserContext from "../UserContext";

const { Title } = Typography;

const DeleteSupplier = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
    const id = event.target.getAttribute("id");
    try {
      const { data } = await axios.delete(`${SUPPLIERS_URI}/${id}`, {
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

  if (!loading) {
    return (
      <>
        <Row justify="center" align="middle">
          <Col span={20}>
            <>
              {success ? (
                <Alert
                  message="Supplier successfully deleted"
                  type="success"
                  closeText="OK"
                  onClose={onClose}
                />
              ) : null}
              <Title level={2}>Delete a Supplier</Title>
              <List
                size="large"
                bordered
                dataSource={suppliers}
                itemLayout="horizontal"
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <a key="item._id" id={item._id} onClick={handleDelete}>
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
    <Row justify="center" align="middle" style={{ height: "80vh" }}>
      <Col>
        <Spin tip="Loading..."></Spin>
      </Col>
    </Row>
  );
};

export default DeleteSupplier;
