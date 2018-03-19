import React, { Component } from 'react';
import * as ac from '../module/posts';

import { connect } from 'react-redux';
import qs from 'qs';

import PostList from '../components/PostList';

class PostListContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <PostList posts={this.props.posts}/>
        )
    }

    componentDidMount() {
        this.props.getPosts(this.props.page, this.getSearchQuery());
    }

    // TODO: 페이지 이동시 두번 호출됨. ajax 통신 딜레이 동안 this.props.page가 갱신되지 않음.
    componentWillReceiveProps(nextProps) {
        if (nextProps.targetPage && nextProps.targetPage != this.props.page) {
            this.props.getPosts(nextProps.targetPage, this.getSearchQuery());
        }
    }

    getSearchQuery = () => {
        if (location.search) {
            return qs.parse(location.search.substr(1, location.search.length)).search;
        }
    }

}

export default connect(
    (state) => ({
        posts : state.posts.posts,
        page: state.posts.page,
        search: state.posts.search
    }),
    (dispatch) => ({
        getPosts: (page, search) => { dispatch(ac.fetchPosts(page, search)) }
    })
)(PostListContainer)