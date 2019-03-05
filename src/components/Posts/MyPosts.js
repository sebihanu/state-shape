import React, { PureComponent } from "react";
import { Button, TextField } from '@material-ui/core';
import Post from './Post';

export default class MyPosts extends PureComponent {
    componentDidMount() {
        const { itemsFilters, pageSize } = this.props;
        this.props.actions.loadPosts(itemsFilters.filter, itemsFilters.orderBy, pageSize);
    }

    componentDidUpdate(prevProps) {
        const { itemsFilters, pageSize } = this.props;
        if (prevProps.itemsFilters !== this.props.itemsFilters)
            this.props.actions.loadPosts(itemsFilters.filter, itemsFilters.orderBy, pageSize);
    }

    loadMore = () => {
        const { itemsFilters, pageSize } = this.props;
        this.props.actions.loadPosts(itemsFilters.filter, itemsFilters.orderBy, pageSize, 'more');
    }

    render() {
        const { posts, postsLoading, onPropertyChange, editFilters, search } = { ...this.props };            
        return (
            <div>
                <TextField label="Filter" value={editFilters.filter} onChange={onPropertyChange('filter')} />
                <Button onClick={search} disabled={postsLoading}>Search</Button>
                <Button onClick={this.loadMore} disabled={postsLoading}>Load more...</Button>
                {postsLoading && (<div>Loading</div>)}
                {posts && posts.map(p => (
                    <Post key={p.id} {...p} />
                ))}
            </div>
        );
    }
}