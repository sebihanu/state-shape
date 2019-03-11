import { compose } from 'redux'
import { connect } from 'react-redux';
import { loadBlogComments } from 'actions/comments';
import { getComments, getCommentsPageLoading } from 'selectors/blogComments'
import MyBlogComments from 'components/Comments/MyBlogComments'
import React, { Component } from 'react';

class MyBlogCommentsWidget extends Component {
    state = { page: 1 }

    loadMore = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }));
    }

    render = () => {
        return (
            <MyBlogCommentsConnected {...this.state} {...this.props} loadMore={this.loadMore} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    const blogId = state.currentUser.blogId;
    const comments = getComments(blogId, ownProps.page, ownProps.pageSize, state);
    const commentsLoading = getCommentsPageLoading(blogId, ownProps.page, ownProps.pageSize, state);

    return {
        comments: comments,
        commentsLoading: commentsLoading,
        blogId: blogId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadBlogComments: (blogId, page, pageSize) => dispatch(loadBlogComments(blogId, page, pageSize))
        }
    };
}

const MyBlogCommentsConnected = compose(connect(mapStateToProps, mapDispatchToProps))(MyBlogComments);
export default MyBlogCommentsWidget;