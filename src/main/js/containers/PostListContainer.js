import React, { Component } from 'react';
import * as ac from '../actions';
import { connect } from 'react-redux';
import PostList from '../components/PostList';

class PostListContainer extends Component {
    render() {
        return(
            <PostList posts={this.props.posts} handlePreview={this.handlePreview}/>
        )
    }

    componentDidMount() {
        this.props.getPosts();
    }

    handlePreview() {
        // this.props.router.push('/posts/1');
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