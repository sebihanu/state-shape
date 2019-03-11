import React, { PureComponent } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { loadPosts } from 'actions/posts';
import { getPosts, getPostsLoading } from 'selectors/posts'
import MyPostsComponent from 'components/Posts/MyPosts'

class MyPostsWidget extends PureComponent {
    state = {
        editFilters: {
            filter: '',
            orderBy: 'latest'
        },
        itemsFilters: {
            filter: '',
            orderBy: 'latest'
        },
        page: 1
    }

    handlePropertyChange = prop => ev => {
        const val = ev.target.value;
        this.setState(prevState => ({
            editFilters: { ...prevState.editFilters, [prop]: val }
        }));
    }

    handleSearch = () => {
        this.setState(prevState => {
            return {
                itemsFilters: { filter: prevState.editFilters.filter, orderBy: prevState.editFilters.orderBy }, page: 1
            }
        });
    }

    loadMore = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }));
    }

    render() {
        return (
            <MyPostsComponentConnected
                onPropertyChange={this.handlePropertyChange}
                search={this.handleSearch}
                {...this.state}
                {...this.props}
                loadMore={this.loadMore} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { page, pageSize } = ownProps;
    const { filter, orderBy } = ownProps.itemsFilters;
    const blogId = state.currentUser.blogId;

    const posts = getPosts(filter, blogId, orderBy, page, pageSize, state);
    const loading = getPostsLoading(filter, blogId, orderBy, page, pageSize, state);

    return {
        posts: posts,
        postsLoading: loading,
        blogId: blogId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ loadPosts }, dispatch)
    };
}

const MyPostsComponentConnected = compose(connect(mapStateToProps, mapDispatchToProps))(MyPostsComponent);
export default MyPostsWidget;