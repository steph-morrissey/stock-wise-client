import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, PageHeader } from 'antd';
import {
  UserOutlined,
  LoginOutlined,
  ScheduleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import UserContext from '../UserContext';

const { SubMenu } = Menu;

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  if (user.token) {
    return (
      <div className='scrollable-container'>
        <PageHeader className='site-page-header' title='Stock Wise' />
        <Menu mode='vertical' style={{ backgroundColor: '#F6F9FE' }}>
          <Menu.Item
            key='1'
            icon={<LoginOutlined />}
            onClick={() => setUser({})}
          >
            Logout
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key='2' icon={<ScheduleOutlined />}>
            <Link to='/dashboard'>Dashboard</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key='3' icon={<ScheduleOutlined />}>
            <Link to='/inventory'>View Inventory</Link>
          </Menu.Item>
          <Menu.Divider />
          <SubMenu key='sub1' icon={<PlusOutlined />} title='Add to Inventory'>
            <Menu.Item key='4'>
              <Link to='/suppliers'>Add a Supplier</Link>
            </Menu.Item>
            <Menu.Item key='5'>
              <Link to='/categories'>Add a Category</Link>
            </Menu.Item>
            <Menu.Item key='6'>
              <Link to='/products'>Add a Product</Link>
            </Menu.Item>
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
  }
  return (
    <div className='scrollable-container'>
      <PageHeader className='site-page-header' title='Stock Wise' />
      <Menu mode='vertical' style={{ backgroundColor: '#F6F9FE' }}>
        <Menu.Item key='1' icon={<LoginOutlined />}>
          <Link to='/login'>Login</Link>
        </Menu.Item>
        <Menu.Item key='2' icon={<UserOutlined />}>
          <Link to='/register'>Register</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
