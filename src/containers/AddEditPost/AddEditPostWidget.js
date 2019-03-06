import React, { PureComponent } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { getInt } from 'utils/functions'

class AddEditPostWidget extends PureComponent {
    state = {
        
    }

    isNew() {
        return this.props.match.params.newPost === 'new';
    }

    getPostId() {
        let postId = getInt(this.props.match.params.postId);        

        return postId;
    }

    render() {
        return (
            <div>{this.isNew() ? "new" : "edit"} - {this.getPostId()}</div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

//const MyPostsComponentConnected = compose(connect(mapStateToProps, mapDispatchToProps))(MyPostsComponent);
export default AddEditPostWidget;