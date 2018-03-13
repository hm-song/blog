import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as postActions from '../module/posts';
import Menu from '../components/Menu';

class MenuContainer extends Component {
    render() {
        return (
            <Menu authenticated={this.props.authenticated}
                handleSearchChange={this.props.handleSearchChange}
                search={this.search}/>
        );
    }

    search = (e) => {
        if (e.key == 'Enter') {
            this.props.fetchPost(this.props.search);
        }
    }
}

MenuContainer.propTypes = {};

export default connect(
    (state) => ({
        authenticated: state.login.authenticated,
        search: state.posts.search
    }),
    (dispatch) => ({
        handleSearchChange: (e) => {dispatch(postActions.handleSearchChange(e))},
        fetchPost: (keyword)  => dispatch(postActions.fetchPosts(0, keyword))
    })
)(MenuContainer);
