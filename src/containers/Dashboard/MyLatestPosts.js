import React, { Component } from "react";
import Post from "components/Posts/Post";
import { MockApi as api } from 'api/mockApi'

class MyLatestPosts extends Component {
    componentDidMount() {
        
        const posts = await api.getPostsByBlog();
        debugger;
    }

    render() {
        return (
            <div>
                <Post />
            </div>
        );
    }
}

export default MyLatestPosts;