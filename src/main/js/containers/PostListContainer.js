import React, { Component } from 'react';
import * as ac from '../module/posts';
import { connect } from 'react-redux';
import PostList from '../components/PostList';

class PostListContainer extends Component {
    render() {
        return(
            <PostList posts={this.props.posts}/>
        )
    }

    componentDidMount() {
        this.props.getPosts();
    }
}

export default connect(
    (state) => ({
        posts : state.posts.posts,
    }),
    (dispatch) => ({
        getPosts: () => { dispatch(ac.fetchPosts()) }
    })
)(PostListContainer)