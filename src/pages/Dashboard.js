import React, { useState, useEffect, useContext } from "react";
import { Spin, Row, Col, Divider } from "antd";
import axios from "axios";
import UserContext from "../UserContext";
import { DASHBOARD_URI } from "../api/constants";
import { LowInStock } from "../components/LowInStock";
import { TopSuppliers } from "../components/TopSuppliers";
import { TopCategories } from "../components/TopCategories";

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState("");
  const [error, setError] = useState("");

  const getDashboard = async () => {
    const { data } = await axios.get(DASHBOARD_URI, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setDashboard(data);
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        await getDashboard();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
        if (err) throw error;
      }
    };
    fetchDashboard();
  }, []);

  if (!loading) {
    console.log(dashboard);
    return (
      <div>
        <LowInStock products={dashboard.products} />
        <Divider />
        <TopSuppliers suppliers={dashboard.suppliers} />
        <Divider />
        <TopCategories categories={dashboard.categories} />
      </div>
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
