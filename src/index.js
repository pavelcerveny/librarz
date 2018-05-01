import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore, history } from './store/configureStore';

import './index.scss';
import App from './App';
import DevTools from './DevTools';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ConnectedRouter history={history}>
        <Route exact path="/" component={App}/>
      </ConnectedRouter>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
