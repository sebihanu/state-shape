import { compose } from 'redux'
import { connect } from 'react-redux';
import { loadPosts } from 'actions/posts';
import { getPosts, getPostsLoading } from 'selectors/posts'
import MyLatestPosts from 'components/Posts/MyLatestPosts'

const filter = '';
const orderBy = 'latest';

function mapStateToProps(state, ownProps) {
    const blogId = state.currentUser.blogId;
    const posts = getPosts(filter, blogId, orderBy, ownProps.pageSize, state);
    const loading = getPostsLoading(filter, blogId, orderBy, ownProps.pageSize, state);    
    return {
        posts: posts,
        postsLoading: loading,
        blogId: blogId
    };
}

function mapDispatchToProps(dispatch) {    
    return {
        actions: {
            loadPosts: (pageSize, blogId, loadType) => dispatch(loadPosts(filter, blogId, orderBy, pageSize, loadType))
        }
    };
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(MyLatestPosts);