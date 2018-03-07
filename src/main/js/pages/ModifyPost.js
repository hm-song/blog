import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ac from '../reducers/editor';
import { Header } from '../components';

class ModifyPost extends Component {
    render() {
        return(
            <div>
                <Header title={'Modify Post'}/>
                {/*<div id="editorContainer" style={containerStyle}>*/}
                <div className="container">
                    <div id="title" className="editor-title"></div>
                    <div id="content" className="editor-content"></div>
                    <div className="editor-btn-group">
                        <button type="button" className="btn btn-dark" onClick={this.props.submit}>등록</button>
                        <button type="button" className="btn btn-secondary">취소</button>
                        <label>
                            <input type="checkbox" name="public" value="true" checked={this.props.display} onChange={this.props.handleChange}/>공개
                        </label>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.fetchPostAndModifiable(this.props.match.params.id);
    }
}

export default connect(
    (state) => ({
        title: state.editor.title,
        body: state.editor.body,
        display: state.editor.display,
        post:  state.posts.postDetail
    }),
    (dispatch) => ({
        fetchPostAndModifiable: (id) => dispatch(ac.fetchPostAndModifiable(id)),
        handleChange: (e) => dispatch(ac.handlePublicChange(e)),
        submit: () => dispatch(ac.submit())
    })
)(ModifyPost);