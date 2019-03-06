import React from 'react'
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const post = (props) => {
    return (
        <Grid container spacing={8}>
            <Grid item sm={6}>
                <div>{props.updated.toDateString()}</div>
            </Grid>
            <Grid item sm={6}>
                <div>
                    {props.labels && props.labels.length > 0 && props.labels.map(l => (
                        <React.Fragment key={l}>{ l }</React.Fragment>
                    ))}
                </div>
            </Grid>
            <Grid item sm={12}>
                <div>{props.name}</div>
            </Grid>
            <Grid item sm={12}>
                <div>{props.content}</div>
            </Grid>
        </Grid>
    );
}

post.propTypes = {
    updated: PropTypes.instanceOf(Date).isRequired,
    labels: PropTypes.array,
    name: PropTypes.string.isRequired,
    content: PropTypes.string    
};

export default post;