import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBarLink = ({children, ...rest}) => {
    return (
        <div className="nav-link">
            <NavLink 
                {...rest} 
                className="nav-link__link" 
                activeClassName="nav-link__link--active"
            >
                {children}
            </NavLink>
            <hr className="nav-link__hr"/> 
        </div>
    );
};

export default NavBarLink;