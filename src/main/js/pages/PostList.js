import React from 'react';
import { Header } from '../components';
import { PostListContainer } from '../containers';

const PostList = () => {
    return (
        <div>
            <Header title={'Confident Developer'} subTitle={''}/>
            <PostListContainer/>
        </div>
    );
};

export default PostList;
