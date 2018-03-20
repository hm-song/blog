import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateMenuContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { authenticated, component: Component, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render={
                    props => authenticated ?
                        (<Component {...props} />) :
                        (<Redirect to={{pathname: '/', state: {from: props.location}}}/>)
                }/>
        );
    }
}

export default connect(
    (state) => ({
        authenticated: state.login.authenticated
    })
)(PrivateMenuContainer);
