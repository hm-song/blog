import React from 'react';
import { Header } from '../components';
import { PostListContainer } from '../containers';

// match.params에 <Router path=""/> 로 전달된 pathVariable이 저장된다.
const PostList = () => {
    return (
        <div>
            <Header title={"Post List Title!"} subTitle={"Post List SubTitle"}/>
            <PostListContainer/>
        </div>
    );
};

export default PostList;
