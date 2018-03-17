import React, { Component } from 'react';
import { connect } from 'react-redux';

import Quill from 'quill';
import NavLinkButton from '../components/button/NavLinkButton';

import * as ac from '../module/editor';
import { Header } from '../components';
import { TagInputContainer } from '../containers';

class ModifyPost extends Component {
    render() {
        return(
            <div>
                <Header title={'Modify Post'}/>
                <div className="container">
                    <div id="title" className="editor-title"></div>
                    <div id="content" className="editor-content"></div>

                    <div className="tag-group">
                        <h5>Tag</h5>
                        <TagInputContainer tags={this.props.tags}/>
                    </div>

                    <div className="editor-btn-group">
                        <button type="button" className="btn btn-dark" onClick={this.submit}>등록</button>
                        <NavLinkButton
                            className='btn-secondary'
                            linkTo={'/posts/' + this.props.postId}
                            text={'취소'}/>
                        <label>
                            <input type="checkbox" name="public" value="true" checked={this.props.display} onChange={this.props.handleChange}/>공개
                        </label>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.initEditor();
        this.props.fetchPostAndModifiable(this.props.match.params.id);
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
    }

    submit = () => {
        const tags = this.props.tags.map(tag => tag.text);

        if (confirm('저장하시겠습니까?')) {
            const param = {
                title: this.props.titleEditor.getText(),
                contents: this.props.bodyEditor.getText(),
                display: this.props.display,
                tags: tags
            };
            console.log(param);
            this.props.submit(this.props.postId, param);
        }
    }
}

export default connect(
    (state) => ({
        postId: state.editor.postId,
        titleEditor: state.editor.quillTitle,
        bodyEditor: state.editor.quillBody,
        display: state.editor.display,
        tags: state.tags.get('tags').toJSON()
    }),
    (dispatch) => ({
        fetchPostAndModifiable: (id) => dispatch(ac.fetchPostAndModifiable(id)),
        initEditor: (editorTitle, editorBody) => dispatch(ac.initEditor({editorTitle, editorBody})),
        handleChange: (e) => dispatch(ac.handlePublicChange(e)),
        submit: (postId, params) => dispatch(ac.submit(postId, params))
    })
)(ModifyPost);