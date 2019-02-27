import React, { Component } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as postActions from 'actions/posts';
import Post from 'components/Posts/Post';
import { getPosts } from 'selectors/myLatestPosts'

class MyLatestPosts extends Component {
    componentDidMount() {
        this.props.actions.loadPosts('', 'latest');
        setTimeout(() => {
            this.props.actions.loadPosts('', 'latest', 2);
        }, 10000);
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
    const {
        myLatestPosts: { mapIds },
        entities: { posts }
    } = state;
    const key = { filter: '', orderBy: 'latest' };
    const x = mapIds[JSON.stringify(key)];
    const p = x ? x.map(id => posts[id]) : [];

    return {
        posts: p, //getPosts(state)
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