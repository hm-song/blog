import React from 'react';
import { NavLink } from 'react-router-dom';

const PrevPageButton = ({ path }) => {
    return (
        <NavLink className="btn btn-primary float-left" to={path}>&larr; Newer Posts</NavLink>
    );
};

export default PrevPageButton;
