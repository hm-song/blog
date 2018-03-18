import React from 'react';
import { NavLink } from 'react-router-dom';

const TagComponent = ({ tag }) => {
    return (
        <span className="tag-element">
            <NavLink to={'/?search=' + tag}>
                    #{tag}
            </NavLink>
        </span>
    );
};

export default TagComponent;
