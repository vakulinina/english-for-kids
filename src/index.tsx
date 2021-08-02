import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './style.css';
import { setLocalStorage } from './components/statistics';

if (!localStorage.getItem('statistics')) {
  setLocalStorage();
}

ReactDOM.render(<App />, document.getElementById('root'));
