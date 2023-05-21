import React, { StrictMode, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/reset.css';
import './assets/styles/index.css';
import Login from './pages/Authorization/Login/Login';
import { Route, Router, useNavigate } from 'react-router-dom';
import { Switch } from 'antd';
import { BrowserRouter } from 'react-router-dom/dist';
import { Provider } from 'react-redux';
import store from './stores/rootStore';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
// const [isLoggedIn, setIsLoggedIn] = useState(false);
// const handleLogin = () => {
//   setIsLoggedIn(true);
// };

root.render(
  <StrictMode>
    {/* <Router>
      <Switch>
        <Route path="">
          {' '}
          {isLoggedIn ? (
            <Redirect to="/App" />
          ) : (
            <Login onLogin={handleLogin} />
          )}{' '}
        </Route>
        <Route path="/App">
          {' '}
          {isLoggedIn ? <App /> : <Redirect to="/" />}{' '}
        </Route>
      </Switch>
    </Router> */}

    <BrowserRouter>
      <Provider store={store}>
        {/* <Login /> */}
        <App />
        {/* <AppRoutes /> */}
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
