import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const PostPreview = ({id, title, regDate }) => (
    <div className="post-preview">
        <NavLink to={"/posts/" + id}>
            <h2 className="post-title">
                {title}
            </h2>
            {/*<h3 className="post-subtitle">*/}
            {/*Sub Title*/}
            {/*</h3>*/}
        </NavLink>
        <p className="post-meta">
            Posted on {regDate}
        </p>
        <hr />
    </div>
)

PostPreview.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    regDate: PropTypes.string.isRequired
};

export default PostPreview;
