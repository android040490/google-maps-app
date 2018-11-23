import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser } from 'redux-store/selectors';

class ProtectedRoute extends Component {
    render() {
        let {component: Component, user, ...rest} = this.props;
        return (
            <Route 
            {...rest}
            render={props => 
                user ? (
                    <Component {...props}/>
                ): (
                    <Redirect 
                        to={{
                            pathname: '/authorization',
                            state: {from: props.location}
                        }}
                    />
                )
            }
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: getUser(state)
    }
}

export default connect(mapStateToProps, null, null, {pure: false})(ProtectedRoute);