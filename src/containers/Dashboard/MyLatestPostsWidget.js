import React, { PureComponent } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as postActions from 'actions/posts';
import { getPosts } from 'selectors/myLatestPosts'
import MyLatestPostsComponent from 'components/Posts/MyLatestPosts'

class MyLatestPostsWidget extends PureComponent {
    state = {
        filter: '',
        orderBy: 'latest',
        page: 1,
        pageSize: 4
    }

    componentDidMount() {
        const interval = setInterval(() => {
            this.setState((prevState) => {
                const page = prevState.page + 1;
                return { page: page }
            });
        }, 4000);
        setTimeout(() => {
            clearInterval(interval);
        }, 3000);
    }

    loadMore = () => {
        this.setState((prevState) => {
            const page = prevState.page + 1;
            return { page: page }
        });
    }

    render() {
        return (
            <MyLatestPostsComponentConnected {...this.state} loadMore={this.loadMore} />
        );
    }
}

function mapStateToProps(state, ownProps) {

    const key = postActions.loadPostsKey(ownProps.filter, ownProps.orderBy);
    const posts = getPosts(key, state);
    return {
        posts: posts,
        postsLoading: state.myLatestPosts.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...postActions }, dispatch)
    };
}

const MyLatestPostsComponentConnected = compose(connect(mapStateToProps, mapDispatchToProps))(MyLatestPostsComponent);
export default MyLatestPostsWidget;