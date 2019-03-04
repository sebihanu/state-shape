import { compose } from 'redux'
import { connect } from 'react-redux';
import { loadPosts } from 'actions/posts';
import { getPosts, getPostsLoading } from 'selectors/myPosts'
import MyLatestPosts from 'components/Posts/MyLatestPosts'

const filter = '';
const orderBy = 'latest';

function mapStateToProps(state, ownProps) {
    const posts = getPosts(filter, orderBy, ownProps.pageSize, state);
    const loading = getPostsLoading(filter, orderBy, ownProps.pageSize, state);
    return {
        posts: posts,
        postsLoading: loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadPosts: (pageSize, loadType) => dispatch(loadPosts(filter, orderBy, pageSize, loadType))
        }
    };
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(MyLatestPosts);