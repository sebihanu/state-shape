import React, { Component } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as postActions from 'actions/posts';
import Post from 'components/Posts/Post';
import { getPosts } from 'selectors/myLatestPosts'

class MyLatestPosts extends Component {
    componentDidMount() {
        this.props.actions.loadPosts('filter', 'orderBy', 10, 1);
        setTimeout(() => {            
            this.props.actions.loadPosts('filter', 'orderBy', 10, 1);
        }, 3000);
    }

    render() {
        const { postsLoading, postsLoaded } = { ...this.props };
        const posts = this.props.posts;
        return (
            <div>
                {postsLoading && (<div>Loading</div>)}
                {postsLoaded && posts.map(p => (
                    <Post key={p.id} {...p} />
                ))}                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: getPosts(state),
        postsLoading: state.myLatestPosts.loading,
        postsLoaded: state.myLatestPosts.loaded
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...postActions }, dispatch)
    };
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(MyLatestPosts);