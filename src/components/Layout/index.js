import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import NavBar from 'components/NavBar';
import MainPage from 'components/MainPage';
import AuthorizationPage from 'containers/AuthorizationPage';
import AboutAuthorPage from 'containers/AboutAuthorPage';
import ProtectedRoute from 'containers/ProtectedRoute';
import SignInSignOutBTN from 'containers/SignInSignOutBTN';

class Layout extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <section className="page">
                <header className="page__header">
                    <div className="header">
                        <div className="header__navbar wrapper">
                            <NavBar/>
                            <SignInSignOutBTN/>
                        </div>
                    </div>
                </header>
                
                <div className="page__content wrapper">
                    <Route exact path='/' component={MainPage}/>
                    <Route path='/authorization' component={AuthorizationPage}/>
                    <ProtectedRoute path='/about-auth' component={AboutAuthorPage}/>
                </div>
            </section>
        );
    }
}

export default Layout;