import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Navigation from './components/Navigation';
import ProductForm from './components/ProductFrom';
function App() {
  return (
    <div className='App'>
      <Navigation />
      <ProductForm />
    </div>
  );
}

export default App;
