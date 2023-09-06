import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './components/router';
import { Provider } from "react-redux";
import store from "./redux/store"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);