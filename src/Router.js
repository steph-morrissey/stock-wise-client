import React, { useContext } from 'react';
import { Redirect, HashRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import UserContext from './UserContext';

import Navbar from './components/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
// Categories pages
import { AddCategories } from './pages/categories/AddCategories';
import { Category } from './pages/categories/Category';
import { UpdateCategories } from './pages/categories/UpdateCategories';
import { DeleteCategories } from './pages/categories/DeleteCategories';
// Suppliers pages
import { Supplier } from './pages/suppliers/Supplier';
import { AddSuppliers } from './pages/suppliers/AddSuppliers';
import { AllSuppliers } from './pages/suppliers/AllSuppliers';
import { UpdateSuppliers } from './pages/suppliers/UpdateSuppliers';
import { DeleteSuppliers } from './pages/suppliers/DeleteSuppliers';
// Product pages
import { AddProducts } from './pages/Products/AddProducts';
import { UpdateProducts } from './pages/Products/UpdateProducts';
import { DeleteProducts } from './pages/Products/DeleteProducts';

const { Content, Sider } = Layout;

export const Router = () => {
  const { user } = useContext(UserContext);

  return (
    <HashRouter>
      <Layout style={{ backgroundColor: '#FFF' }}>
        <Sider
          style={{
            backgroundColor: '#150B41',
            position: 'fixed',
            overflow: 'auto',
            height: '100vh',
            left: 0,
          }}
        >
          <Navbar />
        </Sider>
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ backgroundColor: '#FFF' }}>
            <Switch>
              <Route path='/login' exact>
                {user.token ? <Redirect to='/dashboard' /> : <Login />}
              </Route>
              <Route path='/register' exact>
                {user.token ? <Redirect to='/dashboard' /> : <Register />}
              </Route>
              <Route path='/dashboard' exact>
                {user.token ? <Dashboard /> : <Redirect to='/login' />}
              </Route>
              <Route path='/inventory' exact>
                {user.token ? <Inventory /> : <Redirect to='/login' />}
              </Route>
              <Route path='/suppliers' exact>
                {user.token ? <AddSuppliers /> : <Redirect to='/login' />}
              </Route>
              <Route path='/suppliers/update' exact>
                {user.token ? <UpdateSuppliers /> : <Redirect to='/login' />}
              </Route>
              <Route path='/suppliers/delete' exact>
                {user.token ? <DeleteSuppliers /> : <Redirect to='/login' />}
              </Route>
              <Route path='/suppliers/view' exact>
                {user.token ? <AllSuppliers /> : <Redirect to='/login' />}
              </Route>
              <Route path='/suppliers/view/:id' exact>
                {user.token ? <Supplier /> : <Redirect to='/login' />}
              </Route>
              <Route path='/categories' exact>
                {user.token ? <AddCategories /> : <Redirect to='/login' />}
              </Route>
              <Route path='/categories/update' exact>
                {user.token ? <UpdateCategories /> : <Redirect to='/login' />}
              </Route>
              <Route path='/categories/delete' exact>
                {user.token ? <DeleteCategories /> : <Redirect to='/login' />}
              </Route>
              <Route path='/categories/view/:id' exact>
                {user.token ? <Category /> : <Redirect to='/login' />}
              </Route>
              <Route path='/products' exact>
                {user.token ? <AddProducts /> : <Redirect to='/login' />}
              </Route>
              <Route path='/products/update' exact>
                {user.token ? <UpdateProducts /> : <Redirect to='/login' />}
              </Route>
              <Route path='/products/delete' exact>
                {user.token ? <DeleteProducts /> : <Redirect to='/login' />}
              </Route>
              {/* <Route path='/products/view/:id' exact>
              {user.token ? <Product /> : <Redirect to='/login' />}
            </Route> */}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  );
};
