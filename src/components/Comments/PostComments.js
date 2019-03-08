import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { Button, Grid, Switch, TextField } from '@material-ui/core';
import PostComment from './PostComment';

export default class PostComments extends PureComponent {
    componentDidMount() {
        const { postId, pageSize, show } = this.props;
        if (show)
            this.props.actions.loadPostComments(postId, pageSize);
    }

    componentDidUpdate(prevProps) {
        const { postId, pageSize, show } = this.props;
        if (!prevProps.show && show) {
            this.props.actions.loadPostComments(postId, pageSize);
        }
    }

    loadMore = () => {
        const { postId, pageSize } = this.props;
        this.props.actions.loadPostComments(postId, pageSize, 'more');
    }

    reply = () => {
        const { postId, newComment } = this.props;
        this.props.actions.reply(postId, newComment);        
    }

    render() {
        const { comments, commentsLoading, show, onSwitchChange, onPropertyChange, newComment } = { ...this.props };
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
                            <TextField label="comment" value={newComment} onChange={onPropertyChange('newComment')} />
                        </Grid>
                        <Grid item sm={8}>
                            <Button onClick={this.reply}>Reply</Button>
                        </Grid>
                        <Grid item sm={12}>
                            <Button onClick={this.loadMore} disabled={commentsLoading}>Load more...</Button>
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
}

PostComments.propTypes = {
    pageSize: PropTypes.number.isRequired,
    comments: PropTypes.array,
    commentsLoading: PropTypes.bool.isRequired
};