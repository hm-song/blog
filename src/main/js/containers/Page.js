import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as postsActions from '../module/posts';
import NextPageButton from '../components/button/NextPageButton';
import PrevPageButton from "../components/button/PrevPageButton";

class Page extends Component {
    render() {
        const nextPage = this.props.hasNextPage ? <NextPageButton handleClick={this.nextPage}/> : null;
        const prevPage = this.props.hasPrevPage ? <PrevPageButton handleClick={this.prevPage}/> : null;
        return (
            <div className="clearfix">
                {nextPage}
                {prevPage}
            </div>
        );
    }

    nextPage = () => {
        this.props.fetchPosts(this.props.page + 1);
    };

    prevPage = () => {
        this.props.fetchPosts(this.props.page - 1);
    };
}

Page.propTypes = {};

export default connect(
    (state) => ({
        page: state.posts.page,
        hasNextPage: state.posts.hasNextPage,
        hasPrevPage: state.posts.hasPrevPage
    }),
    (dispatch) => ({
        fetchPosts: (page) => dispatch(postsActions.fetchPosts(page))
    })
)(Page);
