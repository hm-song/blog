import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = ({ authenticated }) => {
    return (
        <nav id="mainNav" className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <a className="navbar-brand" href="/index">Confident Programmer</a>
                <button aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right" data-target="#navbarResponsive" data-toggle="collapse" type="button">
                    Menu
                    <i className="fa fa-bars" />
                </button>
                <HiddenMenu authenticated={authenticated}/>
            </div>
        </nav>
    );
};

const HiddenMenu = ({ authenticated }) => {
    if (authenticated) {
        return (
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/write" className="nav-link">Write</NavLink>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/logout">Log Out</a>
                    </li>
                </ul>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}

export default Menu;
