import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUser } from 'redux-store/selectors';
import { logOut } from 'redux-store/actions';

import iconUser from '../../assets/icons/account_circle.svg';
import iconSignIn from '../../assets/icons/sign-in.svg';
import iconSignOut from '../../assets/icons/sign-out.svg';

class SignInSignOutBTN extends Component {
    constructor(props) {
        super(props);

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut() {
        this.props.logOut()
    }

    render() {
        let { user } = this.props;
        let userName = user && (
            <div className="auth-tools__item">
                <img className="auth-tools__item-icon" src={iconUser} alt={user.name} />
                {user.name}
            </div>
        );

        let sign = user
            ? (
                <button className="auth-tools__item" onClick={this.handleLogOut}>
                    Sign out
                    <img className="auth-tools__item-icon" src={iconSignOut} alt="sign out" />
                </button>
            ) : (
                <Link className="auth-tools__item" to="/authorization">
                    Sign in
                    <img className="auth-tools__item-icon" src={iconSignIn} alt="sign in" />
                </Link>
            );

        return (
            <div className="auth-tools">
                {userName}
                {sign}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: getUser(state)
    }
}

const mapDispatchToProps = {
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInSignOutBTN);