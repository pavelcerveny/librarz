import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import configureStore from './store/configureStore.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { fetchRandBook } from './actions/action_fetch_book'

import App from './pages/App.jsx';
import AddBook from './pages/AddBook.jsx';
import Index from './pages/Index.jsx';
import EditBook from './pages/EditBook.jsx';

const store = configureStore();
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

store.dispatch(fetchRandBook());

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Index} />
                    <Route path="/add-book" component={AddBook}/>
                    <Route path="/edit/:bookId" component={EditBook}/>
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
