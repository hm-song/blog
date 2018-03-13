import React from 'react';
import { NavLink } from 'react-router-dom';

const NextPageButton = ({ path }) => {
    return (
        <NavLink className="btn btn-primary float-right" to={path}>Older Posts &rarr;</NavLink>
    );
};

export default NextPageButton;
