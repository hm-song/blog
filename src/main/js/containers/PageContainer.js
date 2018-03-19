import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as postsActions from '../module/posts';
import NextPageButton from '../components/button/NextPageButton';
import PrevPageButton from "../components/button/PrevPageButton";

class Page extends Component {

    // TODO: 리팩토링
    render() {
        let nextPageNum = new Number(this.props.page) + 1;
        let prevPageNum = new Number(this.props.page) - 1;
        let nextPath = '/page/' + nextPageNum;
        let prevPath = '/page/' + prevPageNum;

        nextPath = this.props.search ? nextPath.concat('?search=' + this.props.search) : nextPath;
        prevPath = this.props.search ? prevPath.concat('?search=' + this.props.search) : prevPath;


        const nextPage = this.props.hasNextPage ? <NextPageButton path={nextPath}/> : null;
        const prevPage = this.props.hasPrevPage ? <PrevPageButton path={prevPath}/> : null;
        return (
            <div className="clearfix">
                {nextPage}
                {prevPage}
            </div>
        );
    }
}

Page.propTypes = {};

export default connect(
    (state) => ({
        page: state.posts.page,
        search: state.posts.search,
        hasNextPage: state.posts.hasNextPage,
        hasPrevPage: state.posts.hasPrevPage
    }),
    (dispatch) => ({
        fetchPosts: (page) => dispatch(postsActions.fetchPosts(page))
    })
)(Page);
