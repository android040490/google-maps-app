import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import LoginForm from 'components/LoginForm';
import {login} from 'redux-store/actions';
import {getUser} from 'redux-store/selectors';

class AuthorizationPage extends React.Component {

  handleSubmit = ({email, password}) => {
    this.props.login(email, password)
  }
  render() {
    let {from} = this.props.location.state || {from: {pathname: '/'}};
    let {user} = this.props;

    if(from.pathname == '/about-auth' && user){
      return (
        <Redirect to={from}/>
      )
    }
    return (
      <LoginForm onSubmit={this.handleSubmit}/>
    );
  }
}

const mapDispatchToProps = {
    login
}

const mapStateToProps = (state) => {
  return {
    user: getUser(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage);