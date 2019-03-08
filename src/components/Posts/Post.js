import React from 'react'
import { Grid, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import PostCommentsContainer from 'containers/Comments/PostCommentsContainer'

const post = (props) => {
    return (
        <Grid container spacing={8}>
            <Grid item sm={6}>
                <div>{props.updated.toDateString()}</div>
            </Grid>
            <Grid item sm={6}>
                <div>
                    {props.labels && props.labels.length > 0 && props.labels.map(l => (
                        <React.Fragment key={l}>{l}</React.Fragment>
                    ))}
                </div>
            </Grid>
            <Grid item sm={12}>
                <div>{props.name}</div>
            </Grid>
            <Grid item sm={12}>
                <div>{props.content}</div>
            </Grid>            
            <Grid item sm={12}>
                <PostCommentsContainer postId={props.id} pageSize={3} />
            </Grid>
            <Grid item sm={12}>
                <Divider />
            </Grid>
        </Grid>
    );
}

post.propTypes = {
    id: PropTypes.number.isRequired,
    updated: PropTypes.instanceOf(Date).isRequired,
    labels: PropTypes.array,
    name: PropTypes.string.isRequired,
    content: PropTypes.string
};

export default post;