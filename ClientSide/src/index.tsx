import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LoginPage from './features/user/LoginPage';
import ScrollToTop from './shared/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ToastContainer position='bottom-left' hideProgressBar={true} />
    <ScrollToTop />
    <Switch>
      <Route path='/login' component={LoginPage} />
      <Route path='/' component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
