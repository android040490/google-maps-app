import './main.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import {Provider} from 'react-redux';

import Layout from 'components/Layout';
import history from './history';
import store from './redux-store';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Layout/>    
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
)



