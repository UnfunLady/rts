import ReactDOM from 'react-dom/client';
import React from 'react'
import './index.css';
import './assets/icon/iconfont.js'
import './assets/icon/iconfont.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/zh_CN';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ConfigProvider locale={locale}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>,
);

