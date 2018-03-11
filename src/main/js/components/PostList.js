import React from 'react';
import PropTypes from 'prop-types';
import PostPreview from './PostPreview';

import { PageContainer } from '../containers';

const PostList = ({ posts }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                    <div>
                        {posts.map((item) => {
                            return <PostPreview id={item.id}
                                                title={item.title}
                                                regDate={item.regDate}
                                                key={item.id}/>
                        })}
                    </div>
                    <PageContainer/>
                </div>
            </div>
        </div>
    );
}

PostList.propTypes = {};

export default PostList;
