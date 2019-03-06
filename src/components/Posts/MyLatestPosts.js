import React, {PureComponent } from "react";
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Post from './Post';

export default class MyLatestPosts extends PureComponent {        
    componentDidMount() {        
        this.props.actions.loadPosts(this.props.pageSize, this.props.blogId);
        
        // const interval = setInterval(() => {
        //     this.setState((prevState) => {
        //         this.props.actions.loadPosts(this.props.pageSize, 'more');
        //     });
        // }, 4000);
        // setTimeout(() => {
        //     clearInterval(interval);
        // }, 3000);        
    }

    loadMore = () => {
        this.props.actions.loadPosts(this.props.pageSize, this.props.blogId, 'more');
    }   

    render() {        
        const { posts, postsLoading } = { ...this.props };                
        return (
            <div>
                <Button onClick={this.loadMore} disabled={postsLoading}>Load more...</Button>
                {postsLoading && (<div>Loading</div>)}
                {posts && posts.map(p => (
                    <Post key={p.id} {...p} />
                ))}
            </div>
        );
    }
}

MyLatestPosts.propTypes = {
    pageSize: PropTypes.number.isRequired,
    posts: PropTypes.array,
    postsLoading: PropTypes.bool.isRequired
};