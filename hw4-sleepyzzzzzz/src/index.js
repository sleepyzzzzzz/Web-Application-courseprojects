import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";

import './index.css';
import { frontend } from './reducer';
import Routers from './routers';
import * as serviceWorker from './serviceWorker';

const store = createStore(frontend);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {Routers}
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
