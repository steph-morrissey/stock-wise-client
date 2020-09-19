import React, { useContext } from 'react';
import { Redirect, HashRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import UserContext from './UserContext';

import Navbar from './components/Navbar';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Welcome } from './components/Welcome';

const { Content, Sider } = Layout;

export const Router = () => {
  const { user } = useContext(UserContext);

  return (
    <HashRouter>
      <Layout style={{ backgroundColor: '#FFF' }}>
        <Sider
          style={{
            backgroundColor: '#F6F9FE',
            height: '100vh'
          }}
        >
          <Navbar />
        </Sider>
        <Content style={{ backgroundColor: '#FFF'}}>
          <Switch>
            <Route path="/login" exact>
              {user.token ? <Redirect to="/welcome" /> : <Login />}
            </Route>
            <Route path="/register" exact>
              {user.token ? <Redirect to="/welcome" /> : <Register />}
            </Route>
            <Route path="/welcome" exact>
              {user.token ? <Welcome /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </Content>
      </Layout>
    </HashRouter>
  );
};
