import React, { Component } from 'react';

import {NavLink} from 'react-router-dom';


class NavBar extends Component {
    render() {
        return (
            <div>
                <ul className="navbar">
                    <li><NavLink exact to="/" className="navbar__link" activeClassName="navbar__link--active">Main Page</NavLink></li>
                    <li><NavLink to="/about-auth" className="navbar__link" activeClassName="navbar__link--active">About author</NavLink></li>
                </ul>
            </div>
        );
    }
}

export default NavBar;