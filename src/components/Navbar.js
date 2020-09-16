import React from 'react';
import { Link } from 'react-router-dom';

import { Menu, PageHeader, Button } from 'antd';
import {
  UserOutlined,
  LoginOutlined,
  ScheduleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

class Navbar extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <div className='scrollable-container'>
        <PageHeader className='site-page-header' title='Stock Wise' />
        <Button
          type='primary'
          onClick={this.toggleCollapsed}
          style={{ marginBottom: 16 }}
        ></Button>
        <Menu mode='vertical'>
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
  }
}

export default Navbar;
