import React from "react";
import { Row, PageHeader, Card, Button } from "antd";
import { Link } from "react-router-dom";

export const TopCategories = ({ categories = [] }) => {
  return (
    <div>
      <PageHeader title="Our Categories" />
      <Row
        style={{ display: "flex", flexWrap: "wrap" }}
        justify="center"
        align="middle"
      >
        {categories.map((category) => {
          return (
            <Card
              key={category._id}
              title={category.name}
              bordered={false}
              style={{
                width: 300,
                margin: "20px",
                backgroundColor: "#F6F9FE",
              }}
              id={category._id}
              extra={
                <Button>
                  <Link to={`/categories/view/${category._id}`}>View</Link>
                </Button>
              }
            ></Card>
          );
        })}
      </Row>
    </div>
  );
};
