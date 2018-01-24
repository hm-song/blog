import React from 'react';
import { PostDetailContainer } from '../containers';

const PostDetail = ({ match }) => {
    console.log(match.params.id);
    return (
        <div>
            <PostDetailContainer id={match.params.id}/>
        </div>
    );
};

export default PostDetail;
