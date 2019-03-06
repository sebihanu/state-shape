import React from 'react'
import { Grid, TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const post = (props) => {
    const { onPropertyChange, onSave } = props;
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
                <div>
                    <TextField label="Name" value={props.name} onChange={onPropertyChange('name')} />
                </div>
            </Grid>
            <Grid item sm={12}>
                <TextField label="Content" value={props.content} onChange={onPropertyChange('content')} />
            </Grid>
            <Grid item sm={12}>
                <Button onClick={onSave}>Save</Button>
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