import React, { Component } from 'react';
import { connect } from 'react-redux';

import Quill from 'quill';

import * as ac from '../reducers/editor';
import * as postAction from '../actions/index';
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
                        <button type="button" className="btn btn-dark">등록</button>
                        <button type="button" className="btn btn-secondary">취소</button>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.initEditor(
            new Quill('.editor-content', {
                placeholder: 'Write post content here',
                theme: 'snow'
            }),
            new Quill('.editor-title', {
                placeholder: 'Write post title here',
                theme: 'bubble'
            })
        )
    }
}

export default connect(
    (state) => ({
        title: state.editor.title,
        body: state.editor.body
    }),
    (dispatch) => ({
        initEditor: (quillTitle, quillBody) => dispatch(ac.initEditor(quillTitle, quillBody))
    })
)(ModifyPost);