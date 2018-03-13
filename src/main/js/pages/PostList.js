import React from 'react';
import { Header } from '../components';
import { PostListContainer } from '../containers';

const PostList = ({ match }) => {
    return (
        <div>
            <Header title={'Confident Developer'} subTitle={''}/>
            <PostListContainer targetPage={match.params.page}/>
        </div>
    );
};

export default PostList;
