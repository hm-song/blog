import React, { Component } from 'react';
import { connect } from 'react-redux';

import Quill from 'quill';
import NavLinkButton from '../components/button/NavLinkButton';

import * as ac from '../module/editor';
import { Header } from '../components';
import { TagInputContainer } from '../containers';

class ModifyPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [{ id: 1, text: "Thailand" }, { id: 2, text: "India" }],
            suggestions: ['USA', 'Germany', 'Austria', 'Costa Rica', 'Sri Lanka', 'Thailand']
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
    }

    handleAddition(tag) {
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
    }

    handleDrag(tag, currPos, newPos) {
        let tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: tags });
    }

    render() {
        return(
            <div>
                <Header title={'Modify Post'}/>
                <div className="container">
                    <div id="title" className="editor-title"></div>
                    <div id="content" className="editor-content"></div>

                    <div className="tag-group">
                        <h5>Tag</h5>
                        <TagInputContainer/>
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
        if (confirm('저장하시겠습니까?')) {
            const param = {
                title: this.props.titleEditor.getText(),
                contents: this.props.bodyEditor.getText(),
                display: this.props.display
            };
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
    }),
    (dispatch) => ({
        fetchPostAndModifiable: (id) => dispatch(ac.fetchPostAndModifiable(id)),
        initEditor: (editorTitle, editorBody) => dispatch(ac.initEditor({editorTitle, editorBody})),
        handleChange: (e) => dispatch(ac.handlePublicChange(e)),
        submit: (postId, params) => dispatch(ac.submit(postId, params))
    })
)(ModifyPost);