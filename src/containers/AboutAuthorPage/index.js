import React, { Component } from 'react';
import {connect} from 'react-redux';

import {getUser} from 'redux-store/selectors';

class AboutAuthorPage extends Component {
    render() {
        const {user} = this.props;
        return (
            <div>
                <p>User: <span>{user.name} {user.surname}</span></p>
                <img src={user.avatar} alt={user.name}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user : getUser(state)
    }
}

export default connect(mapStateToProps)(AboutAuthorPage);