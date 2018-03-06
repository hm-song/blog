import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Quill from 'quill';
import axios from 'axios';
import qs from 'qs';

import { Header } from '../components';


class WritePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quillBody: '',
            quillTitle: '',
        };
    }

    componentDidMount() {
        this.setState({
            quillBody: new Quill('#content', {
                placeholder: 'Compose an epic...',
                theme: 'snow'  // or 'bubble'
            }),
            quillTitle: new Quill('#title', {
                placeholder: 'Title...',
                theme: 'bubble'  // or 'bubble'
            })
        });
    }

    handleSubmit = () => {
        if (confirm('추가하시겠습니까?')) {
            const body = this.state.quillBody;
            const title = this.state.quillTitle;
            const params = {
                title: title.getText(),
                contents : body.getText()
            };

            axios.post('/api/admin/posts/write', qs.stringify(params))
                .then(response => {
                    window.location.href = '/posts/' + response.data;
                });
        }
    }

    render() {


        return (
            <div>
                <Header title={'Write New Post'}/>
                {/*<div id="editorContainer" style={containerStyle}>*/}
                <div className="container">
                    <div id="title" className="editor-title"></div>
                    <div id="content" className="editor-content"></div>
                    <div className="editor-btn-group">
                        <button type="button" className="btn btn-dark" onClick={this.handleSubmit}>등록</button>
                        <button type="button" className="btn btn-secondary">취소</button>
                    </div>
                </div>
            </div>
        );
    }
}

WritePost.propTypes = {};

export default WritePost;
