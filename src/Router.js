import React, { useContext } from 'react';
import { Redirect, HashRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import UserContext from './UserContext';

import Navbar from './components/Navbar';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Categories } from './pages/AddCategory';
import { Category } from './pages/Category';
import { UpdateCategories } from './pages/UpdateCategories';
import { DeleteCategories } from './pages/DeleteCategories';
import { Supplier } from './pages/Supplier';
import { Suppliers } from './pages/AddSupplier';
import { AllSuppliers } from './pages/AllSuppliers';
import { UpdateSuppliers } from './pages/UpdateSuppliers';
import { DeleteSuppliers } from './pages/DeleteSuppliers';
// Product pages
import { Products } from './pages/Products/AddProducts';
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
                {user.token ? <Suppliers /> : <Redirect to='/login' />}
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
                {user.token ? <Categories /> : <Redirect to='/login' />}
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
                {user.token ? <Products /> : <Redirect to='/login' />}
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
