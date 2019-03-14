import React from "react";
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Post from './Post';

const MyLatestPosts = (props) => {        
    const { posts, postsLoading, loadMore } = { ...props };                
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

MyLatestPosts.propTypes = {    
    posts: PropTypes.array,
    postsLoading: PropTypes.bool.isRequired,
    loadMore: PropTypes.func
};

export default MyLatestPosts;