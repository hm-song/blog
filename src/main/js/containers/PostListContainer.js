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
        this.props.getPosts(0);
    }

    handlePreview() {
        console.log('Click Preview!!');
        // this.props.router.push('/posts/1');
    }
}

export default connect(
    (state) => ({
        page: state.posts.page,
        posts : state.posts.posts,
        id: state.posts.postList
    }),
    (dispatch) => ({
        getPosts: (page) => { dispatch(ac.fetchPosts(page)) }
    })
)(PostListContainer)