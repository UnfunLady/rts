import ReactDOM from 'react-dom/client';
import React from 'react'
import './index.css';
import './assets/icon/iconfont.js'
import './assets/icon/iconfont.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/zh_CN';
// 引入store
import { persistor, store } from './store/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
/* 此处需要用Provider包裹App，目的是让App所有的后代容器组件都能接收到store */
root.render(


  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <ConfigProvider locale={locale}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </PersistGate>
  </Provider>


);

