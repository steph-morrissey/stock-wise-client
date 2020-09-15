import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Menu, PageHeader, Affix } from 'antd';
import {
  UserOutlined,
  LoginOutlined,
  ScheduleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function handleClick(e) {
  console.log('click', e);
}
const Navbar = () => {
  const [container, setContainer] = useState(null);
  return (
    <div className='scrollable-container' ref={setContainer}>
      <Affix target={() => container}>
        <PageHeader className='site-page-header' title='Stock Wise' />
      </Affix>
      <Menu onClick={handleClick} style={{ width: 256 }} mode='vertical'>
        <Menu.Item key='1' icon={<LoginOutlined />}>
          <Link to='/login'>Login</Link>
        </Menu.Item>
        <Menu.Item key='2' icon={<UserOutlined />}>
          <Link to='/register'>Register</Link>
        </Menu.Item>
        <Menu.Item key='3' icon={<ScheduleOutlined />}>
          Dashboard
        </Menu.Item>
        <SubMenu key='sub1' icon={<PlusOutlined />} title='Add to Inventory'>
          <Menu.Item key='4'>Add a Supplier</Menu.Item>
          <Menu.Item key='5'>Add a Category</Menu.Item>
          <Menu.Item key='6'>Add a Product</Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          icon={<DeleteOutlined />}
          title='Delete from Inventory'
        >
          <Menu.Item key='7'>Delete a Supplier</Menu.Item>
          <Menu.Item key='8'>Delete a Category</Menu.Item>
          <Menu.Item key='9'>Delete a Product</Menu.Item>
        </SubMenu>
        <SubMenu key='sub3' icon={<EditOutlined />} title='Update Inventory'>
          <Menu.Item key='10'>Update a Supplier</Menu.Item>
          <Menu.Item key='11'>Update a Category</Menu.Item>
          <Menu.Item key='12'>Update a Product</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Navbar;
