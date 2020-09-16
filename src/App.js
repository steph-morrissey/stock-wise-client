import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Navigation from './components/Navigation';
import InventoryFrom from './components/InventoryForm';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <InventoryFrom />
    </div>
  );
}

export default App;
