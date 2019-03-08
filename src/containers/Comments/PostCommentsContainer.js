import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import PostComments from 'components/Comments/PostComments'
import { loadPostComments, reply } from 'actions/comments';
import { getComments, getCommentsLoading } from 'selectors/postComments'

class PostCommentsContainer extends Component {
    state = {
        show: false,
        newComment: ''
    }

    handleSwitchChange = event => {
        this.setState({ show: event.target.checked });
    }

    handlePropertyChange = prop => ev => {
        this.setState({ [prop]: ev.target.value });
    }

    render() {
        return (
            <PostCommentsConnected {...this.props} {...this.state}
                onSwitchChange={this.handleSwitchChange}
                onPropertyChange={this.handlePropertyChange} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    const comments = getComments(ownProps.postId, ownProps.pageSize, state);
    const loading = getCommentsLoading(ownProps.postId, ownProps.pageSize, state);
    const replying = true;
    return {
        comments: comments,
        commentsLoading: loading,
        replying
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadPostComments: (postId, pageSize, loadType) => dispatch(loadPostComments(postId, pageSize, loadType)),
            reply: (postId, comment) => dispatch(reply(postId, comment))
        }
    };
}

const PostCommentsConnected = compose(connect(mapStateToProps, mapDispatchToProps))(PostComments);

export default PostCommentsContainer