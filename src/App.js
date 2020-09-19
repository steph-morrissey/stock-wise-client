import React, { useState } from 'react';
import 'antd/dist/antd.css';

import { Router } from './Router';
import UserContext from './UserContext';

const App = () => {
  const [user, setUser] = useState({});
  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Router />
      </UserContext.Provider>
    </div>
  );
};

export default App;
