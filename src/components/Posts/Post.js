import React from 'react'
import { Grid, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

const post = (props) => {
    return (
        <Grid container spacing={8}>
            <Grid item sm={6}>
                <Paper>12/21/2019 10:31</Paper>
            </Grid>
            <Grid item sm={6}>
                <Paper>Label1, Label2</Paper>
            </Grid>
            <Grid item sm={12}>
                <Paper>%POST NAME%</Paper>
            </Grid>
            <Grid item sm={12}>
                <Paper>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</Paper>
            </Grid>
            <Grid item sm={12}>
                <Paper>Comments ^</Paper>
            </Grid>
            <Grid item sm={12}>
                <Paper>%COMMENTS LIST%</Paper>
            </Grid>
        </Grid>
    );
}

post.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    labels: PropTypes.array,
    name: PropTypes.string.isRequired,
    content: PropTypes.string,
    comments: PropTypes.array
};

export default post;