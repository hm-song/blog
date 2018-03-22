import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as loginActions from '../module/login';

class Login extends Component {
    render() {
        const { username, password, handleChange, login } = this.props;
        return (
            <div className="modal fade" id="loginModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="form-control-label">ID:</label>
                                    <input type="text" className="form-control" name="username" value={username} onChange={(e) => handleChange(e)} onKeyPress={this.handleKeyPress}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="form-control-label">Password:</label>
                                    <input type="password" className="form-control" name="password" value={password} onChange={(e) => handleChange(e)} onKeyPress={this.handleKeyPress}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={login}>Send message</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            this.props.login();
        }
    };


    componentDidMount() {
        this.props.checkAuthentication();
    }
}

Login.propTypes = {};

export default connect(
    (state) => ({
        username: state.login.username,
        password: state.login.password
    }),
    (dispatch) => ({
        handleChange : (e) => { dispatch(loginActions.handleChange(e)) },
        login: () => { dispatch(loginActions.login()) },
        checkAuthentication: () => { dispatch(loginActions.checkAuthenticated())}
    })
)(Login);
