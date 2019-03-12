import React, { PureComponent } from "react";
import { Button, TextField, RadioGroup, Radio, FormControlLabel, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Post from './Post';

const MyPosts = (props) => {
    const { posts, postsLoading, onPropertyChange, filters, search, loadMore } = { ...props };
    const getEditPostRoute = id => `/posts/${id}`;
    const EditPostLink = id => props => <Link to={getEditPostRoute(id)} {...props} />

    return (
        <div>
            <TextField label="Filter" value={filters.filter} onChange={onPropertyChange('filter')} />
            <RadioGroup name="orderBy" value={filters.orderBy} onChange={onPropertyChange('orderBy')}>
                <FormControlLabel value="latest" control={<Radio />} label="Latest" />
                <FormControlLabel value="oldest" control={<Radio />} label="Oldest" />
            </RadioGroup>
            <Button onClick={search(filters)} disabled={postsLoading}>Search</Button>
            <Button onClick={loadMore} disabled={postsLoading}>Load more...</Button>
            {postsLoading && (<div>Loading</div>)}
            {posts && posts.map(p => (
                <Grid container key={p.id}>
                    <Grid item>
                        <Button component={EditPostLink(p.id)}>Edit</Button>
                    </Grid>
                    <Grid item>
                        <Post {...p} />
                    </Grid>
                </Grid>
            ))}
        </div>
    )
}

export default MyPosts;