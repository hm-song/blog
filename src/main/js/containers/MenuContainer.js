import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Menu from '../components/Menu';

class MenuContainer extends Component {
    render() {
        return (
            <Menu authenticated={this.props.authenticated}/>
        );
    }
}

MenuContainer.propTypes = {};

export default connect(
    (state) => ({
        authenticated : state.login.authenticated
    })
)(MenuContainer);
