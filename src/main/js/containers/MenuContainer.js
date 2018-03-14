import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as postActions from '../module/posts';
import Menu from '../components/Menu';

class MenuContainer extends Component {
    render() {
        return (
            <Menu authenticated={this.props.authenticated}
                search={this.search}/>
        );
    }

    // TODO: window.location 말고 react-router로 이동 방법 리서치
    search = (e) => {
        if (e.key == 'Enter') {
            if (e.target.value) {
                window.location = '/?search=' + e.target.value;
            } else {
                alert('최소 한글자 이상 입력해주세요');
            }
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
        fetchPost: (keyword)  => dispatch(postActions.fetchPosts(0, keyword))
    })
)(MenuContainer);
