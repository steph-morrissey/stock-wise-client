import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const RenderProductCards = ({ items, handleEvent, buttonText }) => {
  return items.products.map((item) => {
    return (
      <div className='site-card-border-less-wrapper'>
        <Card
          key={item._id}
          title={<Title level={4}>{item.name}</Title>}
          bordered={false}
          style={{
            width: 300,
            margin: '20px',
            backgroundColor: '#F6F9FE',
          }}
          extra={
            <button
              key={item._id}
              id={item._id}
              style={{
                padding: '5px',
                backgroundColor: '#150B41',
                color: '#FFF',
              }}
              onClick={handleEvent}
            >
              {buttonText}
            </button>
          }
        >
          <p>
            <Text strong>Status: </Text>
            {item.status}
          </p>
          <p>
            <Text strong>Cost Price: </Text>
            {item.costPrice}
          </p>
          <p>
            <Text strong>Selling Price: </Text> {item.sellingPrice}
          </p>
        </Card>
      </div>
    );
  });
};

export default RenderProductCards;
