import React, { Component } from 'react';
import { connect } from 'react-redux';

import { WithContext as ReactTags } from 'react-tag-input';
import 'react-tag-input/example/reactTags.css';

import * as tagActions from '../module/tags';


class TagInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReactTags tags={this.props.tags}
                       suggestions={this.props.suggestions}
                       handleDelete={this.props.handleDelete}
                       handleAddition={this.props.handleAdd}
                       handleDrag={this.props.handleDrag}
                       placeholder={''}
                       autofocus={false}
            />
        );
    }
}

export default connect(
    (state) => ({
        tags: state.tags.get('tags').toJSON(),
        suggestions: state.tags.get('suggestions').toJSON()
    }),
    (dispatch) => ({
        handleAdd: (tag) => dispatch(tagActions.handleAdd(tag)),
        handleDelete: (index) => dispatch(tagActions.handleDelete(index)),
        handleDrag: (tag, currPos, newPos) => dispatch(tagActions.handleDrag({tag, currPos, newPos}))
    })
)(TagInput);
