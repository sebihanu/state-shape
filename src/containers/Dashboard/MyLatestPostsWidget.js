import { compose } from 'redux'
import { connect } from 'react-redux';
import { loadPosts } from 'actions/posts';
import { getPosts, getPostsLoading } from 'selectors/posts'
import MyLatestPosts from 'components/Posts/MyLatestPosts'
import React, { PureComponent } from 'react';

class MyLatestPostsWidget extends PureComponent {
    state = { page: 1 }
    
    loadMore = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }));
    }

    render = () => {
        return (
            <MyLatestPostsConnected {...this.props} {...this.state} loadMore={this.loadMore}/>
        );
    }
}

const filter = '';
const orderBy = 'latest';

function mapStateToProps(state, ownProps) {
    const blogId = state.currentUser.blogId;
    const posts = getPosts(filter, blogId, orderBy, ownProps.page, ownProps.pageSize, state);
    const loading = getPostsLoading(filter, blogId, orderBy, ownProps.page, ownProps.pageSize, state);
    return {
        posts: posts,
        postsLoading: loading,
        blogId: blogId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadPosts: (blogId, page, pageSize) => dispatch(loadPosts(filter, blogId, orderBy, page, pageSize))
        }
    };
}

const MyLatestPostsConnected = compose(connect(mapStateToProps, mapDispatchToProps))(MyLatestPosts);
export default MyLatestPostsWidget;