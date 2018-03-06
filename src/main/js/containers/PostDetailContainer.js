import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as ac from '../actions';

import { Post } from '../components';

class PostDetailContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Post title={this.props.postDetail.title}
                      body={this.props.postDetail.contents}
                      postId={this.props.id}
                      authenticated={this.props.authenticated}
                />
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchPost(this.props.id);
    }
}

PostDetailContainer.propTypes = {};

export default connect(
    (state) => ({
        postDetail: state.posts.postDetail,
        authenticated: state.login.authenticated
    }),
    (dispatch) => ({
        fetchPost: (id) => dispatch(ac.fetchPostDetail(id))
    })
)(PostDetailContainer);