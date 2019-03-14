import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { loadPosts } from 'actions/posts';
import { getPosts, getPostsLoading } from 'selectors/posts'
import MyLatestPosts from 'components/Posts/MyLatestPosts'

const filter = '';
const orderBy = 'latest';

class MyLatestPostsWidget extends PureComponent {
    componentDidMount() {
        const { page, pageSize, blogId } = this.props;
        this.props.actions.loadPosts(blogId, page, pageSize);
    }

    componentDidUpdate(prevProps) {
        const { blogId, page, pageSize } = this.props;
        if (prevProps.page !== page) {
            this.props.actions.loadPosts(blogId, page, pageSize);
        }
    }

    render = () => {
        const { posts, postsLoading, loadMore } = this.props;
        const myLatestPostsProps = { posts, postsLoading, loadMore };
        return (
            <MyLatestPosts {...myLatestPostsProps} />
        );
    }
}

MyLatestPostsWidget.propTypes = {    
    posts: PropTypes.array.isRequired,
    postsLoading: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    blogId: PropTypes.number.isRequired,
    actions: PropTypes.shape({
        loadPosts: PropTypes.func.isRequired
    }).isRequired
};

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

const MyLatestPostsConnected = compose(connect(mapStateToProps, mapDispatchToProps))(MyLatestPostsWidget);

class MyLatestPostsWidgetLocalState extends PureComponent {
    state = { page: 1 }

    loadMore = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }));
    }

    render() {
        return (
            <MyLatestPostsConnected {...this.props} {...this.state}
                loadMore={this.loadMore} />
        );
    }
}

MyLatestPostsWidgetLocalState.propTypes = {        
    pageSize: PropTypes.number.isRequired
};

export default MyLatestPostsWidgetLocalState;