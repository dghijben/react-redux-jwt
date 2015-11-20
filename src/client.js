/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import createHistory from 'history/lib/createBrowserHistory';
import createHistory from './helpers/history';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import {reduxReactRouter, ReduxRouter} from 'redux-router';
import listener from 'redux/listener';
import getRoutes from './routes';
import makeRouteHooksSafe from './helpers/makeRouteHooksSafe';
// import Intl from 'intl'; // eslint-disable-line
require('intl');
import {IntlProvider} from 'react-intl';
const i18n = window.__i18n;
const client = new ApiClient();

// Three different types of scroll behavior available.
// Documented here: https://github.com/rackt/scroll-behavior
const scrollablehistory = useScroll(createHistory);

const dest = document.getElementById('reactdata');
const store = createStore(reduxReactRouter, makeRouteHooksSafe(getRoutes), scrollablehistory, client, window.__data);
listener(store);

const component = (
  <IntlProvider locale={i18n.locale} messages={i18n.messages}>
    <ReduxRouter routes={getRoutes(store)} />
  </IntlProvider>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}

