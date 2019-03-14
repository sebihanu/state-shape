import React from 'react'
import { Grid, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

const postComment = (props) => {
    return (
        <Grid container spacing={8}>
            <Grid item sm={6}>
                <div>{props.created.toDateString()}</div>
            </Grid>            
            <Grid item sm={12}>
                <div>{props.content}</div>
            </Grid>            
            <Grid item sm={12}>
                <Divider  />
            </Grid>            
        </Grid>
    );
}

postComment.propTypes = {
    created: PropTypes.instanceOf(Date).isRequired,    
    content: PropTypes.string,    
};

export default postComment;