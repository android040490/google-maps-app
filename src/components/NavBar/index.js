import React, { Component } from 'react';

import NavBarLink from 'components/NavBarLink';

class NavBar extends Component {
    render() {
        return (
            <div>
                <ul className="navbar">
                    <li>
                        <NavBarLink exact to="/">Main Page</NavBarLink>
                    </li>
                    <li>
                        <NavBarLink to="/about-auth">About author</NavBarLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavBar;