import React from "react";
import { Row, PageHeader, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export const LowInStock = ({ products = [] }) => {
  return (
    <div>
      <PageHeader title="Low In Stock" />
      <Row
        style={{ display: "flex", flexWrap: "wrap" }}
        justify="center"
        align="middle"
      >
        {products.map((product) => {
          return (
            <Card
              key={product._id}
              title={product.name}
              bordered={false}
              style={{
                width: 300,
                margin: "20px",
                backgroundColor: "#F6F9FE",
              }}
              id={product._id}
              extra={<ExclamationCircleOutlined style={{ color: "red" }} />}
            >
              <p>Status: {product.status}</p>
              <p>Cost Price: £{product.costPrice}</p>
              <p>Selling Price: £ {product.sellingPrice}</p>
            </Card>
          );
        })}
      </Row>
    </div>
  );
};
