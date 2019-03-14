import React from "react";
import PropTypes from 'prop-types';
import { Button, Grid, Switch, TextField } from '@material-ui/core';
import PostComment from './PostComment';

const PostComments = (props) => {
    const { comments, commentsLoading, show, onSwitchChange, onPropertyChange, newComment, reply, loadMore, replying } = { ...props };
    return (
        <Grid container spacing={8} alignItems="center">
            <Grid item sm={4}>
                Comments
            </Grid>
            <Grid item sm={8}>
                <Switch checked={show} onChange={onSwitchChange}></Switch>
            </Grid>
            {show && (
                <React.Fragment>
                    <Grid item sm={4}>
                        <TextField label="comment" value={newComment} onChange={onPropertyChange('newComment')} disabled={replying} />
                    </Grid>
                    <Grid item sm={8}>
                        <Button onClick={reply} disabled={replying}>Reply</Button>
                    </Grid>
                    <Grid item sm={12}>
                        <Button onClick={loadMore} disabled={commentsLoading}>Load more...</Button>
                        {commentsLoading && (<div>Loading</div>)}
                        {comments && comments.map(c => (
                            <PostComment key={c.id} {...c} />
                        ))}
                    </Grid>
                </React.Fragment>
            )}
        </Grid>
    );
}

PostComments.propTypes = {
    pageSize: PropTypes.number.isRequired,
    comments: PropTypes.array,
    commentsLoading: PropTypes.bool.isRequired
};

export default PostComments;