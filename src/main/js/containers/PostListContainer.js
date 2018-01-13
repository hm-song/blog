import React, { Component } from 'react';
import * as ac from '../actions';
import { connect } from 'react-redux';
import PostList from '../components/PostList';

class PostListContainer extends Component {
    render() {
        return(
            <PostList posts={this.props.posts} onClickPost={this.props.onClickPost}/>
        )
    }

    componentDidMount() {
        this.props.getPosts(0);
    }
}

// redux의 state를 컴포넌트의 props로 매핑. 여기의 state는 redux의 state다.
const mapStateToProps = state => {
    return {
        page: state.page,
        posts : state.posts,
        id: state.postList
    };
}

// props로 전달할 함수 선언. 일반적으로는 action을 dispatch 하는 형태의 함수를 전달한다.
const mapDispatchToProps = dispatch => {
    return {
        getPosts: (page) => { dispatch(ac.fetchPosts(page)) },
        onClickPost: (postId) => { dispatch(ac.getPost(postId)) }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostListContainer)