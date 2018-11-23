import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getUser} from 'redux-store/selectors';
import {logOut} from 'redux-store/actions';

import userImg from '../../assets/icons/user.png';

class SignInSignOutBTN extends Component {
    constructor(props) {
        super(props);
        
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    
    handleLogOut(){
        this.props.logOut()
    }

    render() {
        let {user} = this.props

        return (
            <div>
                {
                    user ? (
                        <div>
                            <img style={{width: '20px'}} src={userImg} alt=""/>
                            <span className="auth-name">{user.name} |</span>
                            <button className="auth-btn" onClick={this.handleLogOut}> LogOut</button>
                        </div>
                    ) : (
                        <Link className="auth-btn" to="/authorization">LogIn</Link>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user : getUser(state)
    }
}

const mapDispatchToProps = {
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInSignOutBTN);