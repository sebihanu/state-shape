import React, { PureComponent } from "react";
import AddEditPostWidget from "./AddEditPostWidget";
import { getInt } from 'utils/functions'

const getPostId = props => {
    return getInt(props.match.params.postId);
}

class AddEditPostPage extends PureComponent {
    goBack = () => this.props.history.goBack();
    isNew = () => this.props.match.params.newPost === 'new';

    render() {
        const postId = getPostId(this.props);
        return (
            <AddEditPostWidget postId={postId} goBack={this.goBack} isNew={this.isNew} />
        );
    }
}

export default AddEditPostPage;