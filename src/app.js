import { Provider } from 'react-redux';
import { render } from 'react-dom';
import React from 'react';
import RouteBuilder from './components/route_builder';

import storeFactory from './store';

const store = storeFactory();

window.React = React;
window.store = store;

render(
  <Provider store={store}>
    <RouteBuilder />
  </Provider>,
  document.getElementById('app'),
);
