import React from 'react'
import ReactDOM from 'react-dom/client'

import Header from '../Header';
import Main from '../Main';


const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <React.StrictMode>
    <Header />
    <Main />
  </React.StrictMode>,
);
