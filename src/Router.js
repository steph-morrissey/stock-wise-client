import React, { useContext } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import UserContext from './UserContext';

import Navbar from './components/Navbar';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Welcome } from './components/Welcome';

const { Content, Sider } = Layout;

const UnauthorisedWrapper = (props) => {
  return (
    <div>
      <p>Please login before accessing the welcome page</p>
      {props.children}
    </div>
  );
};

export const Router = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  return (
    <HashRouter>
      <Layout style={{ backgroundColor: '#FFF' }}>
        <Sider
          style={{
            backgroundColor: '#FFF',
            marginRight: '100px',
          }}
        >
          <Navbar />
        </Sider>
        <Content style={{ backgroundColor: '#FFF', marginTop: '30px' }}>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/welcome'>
              {user.token ? (
                <Welcome />
              ) : (
                <UnauthorisedWrapper>
                  <Login />
                </UnauthorisedWrapper>
              )}
            </Route>
          </Switch>
        </Content>
      </Layout>
    </HashRouter>
  );
};
