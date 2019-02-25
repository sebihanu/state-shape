import React, { Component } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as postActions from 'actions/posts';
import Post from 'components/Posts/Post';

class MyLatestPosts extends Component {
    componentDidMount() {
        this.props.actions.loadPosts();
    }

    render() {
        const { postsLoading, postsLoaded } = { ...this.props.posts };
        const posts = this.props.posts.data;
        return (
            <div>
                {postsLoading && (<div>Loading</div>)}
                {postsLoaded && (<div>Loaded</div>)}
                {posts && posts.length > 0 && posts.map(p => (
                    <Post key={p.id} />
                ))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...postActions }, dispatch)
    };
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(MyLatestPosts);