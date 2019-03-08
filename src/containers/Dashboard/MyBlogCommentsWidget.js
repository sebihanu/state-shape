import React, { PureComponent } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { loadBlogComments } from 'actions/comments';
import { getComments, getCommentsPageLoading, getLastLoadedPage } from 'selectors/blogComments'
import MyBlogComments from 'components/Comments/MyBlogComments'

function mapStateToProps(state, ownProps) {
    const blogId = state.currentUser.blogId;
    const comments = getComments(blogId, ownProps.pageSize, state);
    const lastLoadedPage = getLastLoadedPage(blogId, ownProps.pageSize, state);
    const loadingNextPage = getCommentsPageLoading(blogId, lastLoadedPage + 1, ownProps.pageSize, state);        
    
    return {
        comments: comments,
        commentsLoading: loadingNextPage,        
        lastLoadedPage,
        blogId: blogId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadBlogComments: (blogId, page, pageSize, loadType) => dispatch(loadBlogComments(blogId, page, pageSize, loadType))
        }
    };
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(MyBlogComments);