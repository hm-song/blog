import React from 'react';
import PropTypes from 'prop-types';

const Post = ({id, title, regDate}) => (
    <div className="post-preview">
        <a href="post.html">
            <h2 className="post-title">
                {title}
            </h2>
            {/*<h3 className="post-subtitle">*/}
                {/*Sub Title*/}
            {/*</h3>*/}
        </a>
        <p className="post-meta">
            Posted by
            <a href="#"> Confident Developer </a>
            on {regDate}
        </p>
        <hr />
    </div>
)

Post.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    regDate: PropTypes.string.isRequired
};

export default Post;
