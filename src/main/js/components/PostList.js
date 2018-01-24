import React from 'react';
import PropTypes from 'prop-types';
import PostPreview from './PostPreview';

const PostList = ({ posts, handlePreview}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                    <div>
                        {posts.map((item) => {
                            return <PostPreview id={item.id}
                                                title={item.title}
                                                regDate={item.regDate}
                                                key={item.id}
                                                handlePreview={handlePreview}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

PostList.propTypes = {};

export default PostList;
