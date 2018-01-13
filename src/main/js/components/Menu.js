import React from 'react';

const Menu = () => {
    return (
        <div>
            <div>
                <nav id="mainNav" className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <a className="navbar-brand" href="/index">Confident Programmer</a>
                        <button aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right" data-target="#navbarResponsive" data-toggle="collapse" type="button">
                            Menu
                            <i className="fa fa-bars" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/index">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/write">Write</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/logout">Log Out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Menu;
