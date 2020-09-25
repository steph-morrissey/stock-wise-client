import React from "react";
import { Row, PageHeader, Card, Button } from "antd";
import { Link } from "react-router-dom";

export const TopSuppliers = ({ suppliers = [] }) => {
  return (
    <div>
      <PageHeader title="Our Suppliers" />
      <Row
        style={{ display: "flex", flexWrap: "wrap" }}
        justify="center"
        align="middle"
      >
        {suppliers.map((supplier) => {
          return (
            <Card
              key={supplier._id}
              title={supplier.name}
              bordered={false}
              style={{
                width: 300,
                margin: "20px",
                backgroundColor: "#F6F9FE",
              }}
              id={supplier._id}
              extra={
                <Button>
                  <Link to={`/suppliers/view/${supplier._id}`}>View</Link>
                </Button>
              }
            >
              <p>{supplier.details.firstLine}</p>
              <p>{supplier.details.secondLine}</p>
              {supplier.details.thirdLine ? (
                <p>{supplier.details.thirdLine}</p>
              ) : null}
              <p>{supplier.details.postcode}</p>
              <p>{supplier.details.phone}</p>
            </Card>
          );
        })}
      </Row>
    </div>
  );
};
