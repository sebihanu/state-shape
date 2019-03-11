import React, {PureComponent } from "react";
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Post from './Post';

export default class MyLatestPosts extends PureComponent {        
    componentDidMount() {   
        const { blogId, page, pageSize } = this.props;     
        this.props.actions.loadPosts(blogId, page, pageSize);
        
        // const interval = setInterval(() => {
        //     this.setState((prevState) => {
        //         this.props.actions.loadPosts(this.props.pageSize, 'more');
        //     });
        // }, 4000);
        // setTimeout(() => {
        //     clearInterval(interval);
        // }, 3000);        
    }

    componentDidUpdate(prevProps) {
        const { blogId, page, pageSize } = this.props;
        if (prevProps.page !== page) {            
            this.props.actions.loadPosts(blogId, page, pageSize);
        }
    }

    render() {        
        const { posts, postsLoading, loadMore } = { ...this.props };                
        return (
            <div>
                <Button onClick={loadMore} disabled={postsLoading}>Load more...</Button>
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