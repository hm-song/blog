import React, {Component} from 'react';
import PropTypes from 'prop-types';

class WritePost extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const quill = new Quill('#editor', {theme: 'snow'});
    }

    render() {
        return (
            <div id="editor">
                <p>Hello World!</p>
                <p>Some initial <strong>bold</strong> text</p>
                <p><br/></p>
            </div>
        );
    }
}

WritePost.propTypes = {};

export default WritePost;
