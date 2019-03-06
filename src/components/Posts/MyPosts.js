import React, { PureComponent } from "react";
import { Button, TextField, RadioGroup, Radio, FormControlLabel, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Post from './Post';

export default class MyPosts extends PureComponent {
    componentDidMount() {
        const { itemsFilters, pageSize, blogId } = this.props;
        this.props.actions.loadPosts(itemsFilters.filter, blogId, itemsFilters.orderBy, pageSize);
    }

    componentDidUpdate(prevProps) {
        const { itemsFilters, pageSize, blogId } = this.props;
        if (prevProps.itemsFilters !== this.props.itemsFilters)
            this.props.actions.loadPosts(itemsFilters.filter, blogId, itemsFilters.orderBy, pageSize);
    }

    loadMore = () => {
        const { itemsFilters, pageSize, blogId } = this.props;
        this.props.actions.loadPosts(itemsFilters.filter, blogId, itemsFilters.orderBy, pageSize, 'more');
    }

    render() {
        const { posts, postsLoading, onPropertyChange, editFilters, search } = { ...this.props };
        const getEditPostRoute = id => `/posts/${id}`;
        const EditPostLink = id => props => <Link to={getEditPostRoute(id)} {...props} />
        return (
            <div>
                <TextField label="Filter" value={editFilters.filter} onChange={onPropertyChange('filter')} />
                <RadioGroup name="orderBy" value={editFilters.orderBy} onChange={onPropertyChange('orderBy')}>
                    <FormControlLabel value="latest" control={<Radio />} label="Latest" />
                    <FormControlLabel value="oldest" control={<Radio />} label="Oldest" />
                </RadioGroup>
                <Button onClick={search} disabled={postsLoading}>Search</Button>
                <Button onClick={this.loadMore} disabled={postsLoading}>Load more...</Button>
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
        );
    }
}