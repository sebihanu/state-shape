import React, { PureComponent } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { loadPosts } from 'actions/posts';
import { getPosts, getPostsLoading } from 'selectors/myPosts'
import MyPostsComponent from 'components/Posts/MyPosts'

class MyPostsWidget extends PureComponent {
    state = {
        filters: {
            filter: ''
        },
        orderBy: 'latest'
    }

    handlePropertyChange = prop => value => {
        this.setState({
            filters: { [prop]: value }
        });
    }

    render() {
        return (
            <MyPostsComponentConnected onPropertyChange={this.handlePropertyChange} {...this.state} pageSize={this.props.pageSize} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    const posts = getPosts(ownProps.filters.filter, ownProps.orderBy, ownProps.pageSize, state);
    const loading = getPostsLoading(ownProps.filter, ownProps.orderBy, ownProps.pageSize, state);
    return {
        posts: posts,
        postsLoading: loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ loadPosts }, dispatch)
    };
}

const MyPostsComponentConnected = compose(connect(mapStateToProps, mapDispatchToProps))(MyPostsComponent);
export default MyPostsWidget;