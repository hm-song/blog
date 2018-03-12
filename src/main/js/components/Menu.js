import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = ({ authenticated, handleSearchChange, search }) => {
    const menuItems = authenticated ?
        <HiddenMenu handleSearchChange={handleSearchChange} search={search}/> :
        <CommonMenu handleSearchChange={handleSearchChange} search={search}/>;
    return (
        <nav id="mainNav" className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <a className="navbar-brand" href="/">Confident Programmer</a>
                <button aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right" data-target="#navbarResponsive" data-toggle="collapse" type="button">
                    Menu
                    <i className="fa fa-bars" />
                </button>
                {menuItems}
            </div>
        </nav>
    );
};

const HiddenMenu = ({ handleSearchChange, search }) => {
    return (
        <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink to="/admin/write" className="nav-link">Write</NavLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/logout">Log Out</a>
                </li>
                <li className="nav-item">
                    <input className="form-control form-control-sm" type="text" placeholder="Search" onChange={handleSearchChange} onKeyPress={search}/>
                </li>
            </ul>
        </div>
    )
};

const CommonMenu = ({ handleSearchChange, search }) => {
    return (
        <div>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <input className="form-control form-control-sm" type="text" placeholder="Search" onChange={handleSearchChange} onKeyPress={search}/>
                    </li>
                </ul>
            </div>
        </div>
    )
};


export default Menu;
