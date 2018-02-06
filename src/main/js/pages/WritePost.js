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
        const body = this.state.quillBody;
        const title = this.state.quillTitle;

        console.log(body.getText());
        console.log(body.getContents());

        const params = {
            title: title.getText(),
            contents : body.getText()
        };

        axios.post('/api/admin/posts/write', qs.stringify(params));
    }

    render() {
        const titleStyle = {
            border: 'solid #ccc',
            borderWidth: '1px 1px 0px 1px'
        }

        const bodyStyle = {
            height: 375
        }

        const buttonGroupStyle = {
            marginTop: 10,
            textAlign: 'right'
        }

        return (
            <div>
                <Header title={'Write New Post'}/>
                {/*<div id="editorContainer" style={containerStyle}>*/}
                <div className="container">
                    <div id="title" style={titleStyle}></div>
                    <div id="content" style={bodyStyle}></div>
                    <div style={buttonGroupStyle}>
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
