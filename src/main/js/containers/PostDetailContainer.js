import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Prism from 'prismjs';

import * as ac from '../module/posts';
import { Post } from '../components';

class PostDetailContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Post post={this.props.postDetail}
                      isFetching={this.props.isFetching}
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
        isFetching: state.posts.isFetching,
        authenticated: state.login.authenticated
    }),
    (dispatch) => ({
        fetchPost: (id) => dispatch(ac.fetchPostDetail(id))
    })
)(PostDetailContainer);
