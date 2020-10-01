import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, PageHeader } from 'antd';
import {
  UserOutlined,
  LoginOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';

import UserContext from '../UserContext';

const { SubMenu } = Menu;

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  if (user.token) {
    return (
      <div>
        <PageHeader className='site-page-header'>
          <h3 style={{ color: 'white' }}>Stock Wise</h3>
        </PageHeader>
        <Menu
          icon={<LoginOutlined />}
          style={{ backgroundColor: '#150B41' }}
          theme='dark'
        >
          <Menu.Item
            key='logout'
            icon={<LoginOutlined />}
            onClick={() => {
              localStorage.removeItem('user');
              setUser({});
            }}
          >
            Logout
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key='dashboard' icon={<ScheduleOutlined />}>
            <Link to='/dashboard'>Dashboard</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key='inventory' icon={<ScheduleOutlined />}>
            <Link to='/inventory'>View Inventory</Link>
          </Menu.Item>
          <Menu.Divider />
          <SubMenu
            key='suppliers'
            icon={<AppstoreOutlined />}
            title='Suppliers'
          >
            <Menu.Item key='addSupplier'>
              <Link to='/suppliers'>Add a Supplier</Link>
            </Menu.Item>
            <Menu.Item key='updateSupplier'>
              <Link to='/suppliers/update'>Update a Supplier</Link>
            </Menu.Item>
            <Menu.Item key='deleteSupplier'>
              <Link to='/suppliers/delete'>Delete a Supplier</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key='categories'
            icon={<AppstoreOutlined />}
            title='Categories'
          >
            <Menu.Item key='addCategory'>
              <Link to='/categories'>Add a Category</Link>
            </Menu.Item>
            <Menu.Item key='updateCategory'>
              <Link to='/categories/update'>Update a Category</Link>
            </Menu.Item>
            <Menu.Item key='deleteCategory'>
              <Link to='/categories/delete'>Delete a Category</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key='products' icon={<AppstoreOutlined />} title='Products'>
            <Menu.Item key='addProduct'>
              <Link to='/products'>Add a Product</Link>
            </Menu.Item>
            <Menu.Item key='updateProduct'>
              <Link to='/products/update'>Update a Product</Link>
            </Menu.Item>
            <Menu.Item key='deleteProduct'>
              <Link to='/products/delete'>Delete a Product</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }

  return (
    <div className='scrollable-container'>
      <PageHeader className='site-page-header'>
        <h3 style={{ color: 'white' }}>Stock Wise</h3>
      </PageHeader>
      <Menu mode='vertical' theme='dark' style={{ backgroundColor: '#150B41' }}>
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
