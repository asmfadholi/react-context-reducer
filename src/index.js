import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import App from './views/App';
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './store';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Stage from './router/index'

ReactDOM.render(
  <StateProvider>
    <Router>
      <Stage />
    </Router>
  </StateProvider>,
  document.getElementById('root')
);

// <App />

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
