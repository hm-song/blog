import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkButton = ({className, linkTo, text}) => {
    return (
        <NavLink to={linkTo}>
            <button className={"btn " + className}>{text}</button>
        </NavLink>
    )
}

export default NavLinkButton;