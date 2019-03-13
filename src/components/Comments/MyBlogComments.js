import React from "react";
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Comment from './Comment';

const MyBlogComments = (props) => {
    const { comments, commentsLoading, loadMore } = { ...props };
    return (
        <div>
            <Button onClick={loadMore} disabled={commentsLoading}>Load more...</Button>
            {commentsLoading && (<div>Loading</div>)}
            {comments && comments.map(c => (
                <Comment key={c.id} {...c} />
            ))}
        </div>
    );
}

MyBlogComments.propTypes = {    
    comments: PropTypes.array,
    commentsLoading: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
};

export default MyBlogComments;