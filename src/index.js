import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// removed StrictMode due to issue as detailed below
// https://github.com/steph-morrissey/stock-wise-client/settings/access
ReactDOM.render(<App />, document.getElementById('root'));
