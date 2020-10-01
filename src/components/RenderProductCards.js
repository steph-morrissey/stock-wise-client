import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const RenderProductCards = ({ items, handleEvent }) => {
  return items.products.map((item) => {
    return (
      <div className='site-card-border-less-wrapper'>
        <Card
          key={item._id}
          title={<Title level={3}>{item.name}</Title>}
          bordered={false}
          extra={
            <button
              key={item._id}
              id={item._id}
              style={{
                padding: '5px',
                borderColor: '#FC760B',
                backgroundColor: '#FC760B',
              }}
              onClick={handleEvent}
            >
              edit
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
