import React, { Component } from 'react';
import { connect } from 'react-redux';

import Quill from 'quill';
import NavLinkButton from '../components/button/NavLinkButton';

import * as editorActions from '../module/editor';
import * as tagActions from '../module/tags';
import { Header } from '../components';
import { TagInputContainer } from '../containers';

class WritePost extends Component {
    render() {
        return(
            <div>
                <Header title={'Write Post'}/>
                <div className="container">
                    <div id="title" className="editor-title"></div>
                    <div id="content" className="editor-content"></div>

                    <div className="tag-group">
                        <h5>Tag</h5>
                        <TagInputContainer tags={this.props.tags}/>
                    </div>

                    <div className="editor-btn-group">
                        <button type="button" className="btn btn-dark" onClick={this.submit}>등록</button>
                        <NavLinkButton className='btn-secondary' linkTo={'/'} text={'취소'}/>
                        <label>
                            <input type="checkbox" name="public" value="true" checked={this.props.display} onChange={this.props.handleChange}/>공개
                        </label>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.resetTags();
        this.initEditor();
    }

    initEditor = () => {
        const editorBody = new Quill('.editor-content', {
            placeholder: 'Write post content here',
            theme: 'snow'
        });

        const editorTitle = new Quill('.editor-title', {
            placeholder: 'Write post title here',
            theme: 'bubble'
        });

        this.props.initEditor(editorTitle, editorBody);
    };

    submit = () => {
        const tags = this.props.tags.map(tag => tag.text);

        if (confirm('저장하시겠습니까?')) {
            const param = {
                title: this.props.titleEditor.getText(),
                contents: this.props.bodyEditor.getText(),
                display: this.props.display,
                tags: tags
            };
            this.props.submit(param);
        }
    };
}

export default connect(
    (state) => ({
        titleEditor: state.editor.quillTitle,
        bodyEditor: state.editor.quillBody,
        display: state.editor.display,
        tags: state.tags.get('tags').toJSON()
    }),
    (dispatch) => ({
        initEditor: (editorTitle, editorBody) => dispatch(editorActions.initEditor({editorTitle, editorBody})),
        resetTags: () => dispatch(tagActions.resetTag()),
        handleChange: (e) => dispatch(editorActions.handlePublicChange(e)),
        submit: (params) => dispatch(editorActions.writePost(params))
    })
)(WritePost);