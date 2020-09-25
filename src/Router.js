import React, { useContext } from 'react';
import { Redirect, HashRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import UserContext from './UserContext';

import Navbar from './components/Navbar';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Categories } from './pages/Categories';
import { Suppliers } from './pages/Suppliers';
import { Products } from './pages/Products';
import { UpdateCategories } from './pages/UpdateCategories';
import { UpdateProducts } from './pages/UpdateProducts';
import { UpdateSuppliers } from './pages/UpdateSuppliers';
import { DeleteCategories } from './pages/DeleteCategories';
import { DeleteProducts } from './pages/DeleteProducts';
import { DeleteSuppliers } from './pages/DeleteSuppliers';
import { AllSuppliers } from './pages/AllSuppliers';
import { Supplier } from './pages/Supplier';

const { Content, Sider } = Layout;

export const Router = () => {
  const { user } = useContext(UserContext);

  return (
    <HashRouter>
      <Layout style={{ backgroundColor: '#FFF' }}>
        <Sider
          style={{
            backgroundColor: '#F6F9FE',
            height: '100vh',
          }}
        >
          <Navbar />
        </Sider>
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
            <Route path='/categories' exact>
              {user.token ? <Categories /> : <Redirect to='/login' />}
            </Route>
            <Route path='/products' exact>
              {user.token ? <Products /> : <Redirect to='/login' />}
            </Route>
            <Route path='/suppliers/delete' exact>
              {user.token ? <DeleteSuppliers /> : <Redirect to='/login' />}
            </Route>
            <Route path='/categories/delete' exact>
              {user.token ? <DeleteCategories /> : <Redirect to='/login' />}
            </Route>
            <Route path='/products/delete' exact>
              {user.token ? <DeleteProducts /> : <Redirect to='/login' />}
            </Route>
            <Route path='/suppliers/update' exact>
              {user.token ? <UpdateSuppliers /> : <Redirect to='/login' />}
            </Route>
            <Route path='/categories/update' exact>
              {user.token ? <UpdateCategories /> : <Redirect to='/login' />}
            </Route>
            <Route path='/products/update' exact>
              {user.token ? <UpdateProducts /> : <Redirect to='/login' />}
            </Route>
            <Route path='/suppliers/view' exact>
              {user.token ? <AllSuppliers /> : <Redirect to='/login' />}
            </Route>
            <Route path='/suppliers/view/:id' exact>
              {user.token ? <Supplier /> : <Redirect to='/login' />}
            </Route>
          </Switch>
        </Content>
      </Layout>
    </HashRouter>
  );
};
