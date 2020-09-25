import React from "react";
import { Card, Button, Alert } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export const ProductCards = ({ items = [], showModal }) => {
  if (!items.length) {
    return (
      <Alert
        message="No Products"
        description="Please use the website to fill up your inventory!!"
        type="info"
        showIcon
        style={{ marginTop: "50px" }}
      />
    );
  }
  return items.map((item) => {
    return (
      <Card
        key={item._id}
        title={item.name}
        bordered={false}
        style={{
          width: 300,
          margin: "20px",
          backgroundColor: "#F6F9FE",
        }}
        id={item._id}
        extra={
          item.status !== "Low In Stock" && showModal ? (
            <Button danger>
              <a key={item._id} id={item._id} onClick={showModal}>
                <ExclamationCircleOutlined style={{ marginRight: "8px" }} />
                Low
              </a>
            </Button>
          ) : null
        }
      >
        <p>Status: {item.status}</p>
        <p>Cost Price: {item.costPrice}</p>
        <p>Selling Price: {item.sellingPrice}</p>
      </Card>
    );
  });
};
