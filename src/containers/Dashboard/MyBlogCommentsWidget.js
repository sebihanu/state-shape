import { compose } from 'redux'
import { connect } from 'react-redux';
import { loadBlogComments } from 'actions/comments';
import { getComments, getCommentsLoading } from 'selectors/blogComments'
import MyBlogComments from 'components/Comments/MyBlogComments'

function mapStateToProps(state, ownProps) {
    const blogId = state.currentUser.blogId;
    const comments = getComments(blogId, ownProps.pageSize, state);
    const loading = getCommentsLoading(blogId, ownProps.pageSize, state);    
    return {
        comments: comments,
        commentsLoading: loading,
        blogId: blogId
    };
}

function mapDispatchToProps(dispatch) {    
    return {
        actions: {
            loadBlogComments: (blogId, pageSize, loadType) => dispatch(loadBlogComments(blogId, pageSize, loadType))
        }
    };
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(MyBlogComments);