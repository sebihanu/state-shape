import React, { PureComponent } from "react";
import AddEditPostWidget from "./AddEditPostWidget";
import { getInt } from 'utils/functions'

class AddEditPostPage extends PureComponent {
    goBack = () => this.props.history.goBack();
    isNew = () => this.props.match.params.newPost === 'new';
    getPostId = () => getInt(this.props.match.params.postId);

    render() {
        const AddEditPostWidgetProps = {
            postId: this.getPostId(),
            isNew: this.isNew(),
            goBack: this.goBack
        };
        return (
            <AddEditPostWidget {...AddEditPostWidgetProps} />
        );
    }
}

export default AddEditPostPage;