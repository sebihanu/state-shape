import React, { PureComponent } from "react";
import { Button, TextField, RadioGroup, Radio, FormControlLabel, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Post from './Post';

export default class MyPosts extends PureComponent {
    componentDidMount() {
        const { page, pageSize, blogId } = this.props;
        const { filter, orderBy } = this.props.itemsFilters;
        this.props.actions.loadPosts(filter, blogId, orderBy, page, pageSize);
    }

    componentDidUpdate(prevProps) {
        const { page, pageSize, blogId } = this.props;
        const { filter, orderBy } = this.props.itemsFilters;
        if (prevProps.itemsFilters !== this.props.itemsFilters ||
            prevProps.page !== page) {
            this.props.actions.loadPosts(filter, blogId, orderBy, page, pageSize);
        }
    }

    render() {
        const { posts, postsLoading, onPropertyChange, editFilters, search, loadMore } = { ...this.props };
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
        );
    }
}