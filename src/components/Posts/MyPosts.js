import React, { PureComponent } from "react";
import { Button, TextField } from '@material-ui/core';
import Post from './Post';

export default class MyPosts extends PureComponent {
    componentDidMount() {
        const { filters, orderBy, page, pageSize } = this.props;
        this.props.actions.loadPosts(filters.filter, orderBy, pageSize);
    }
    // componentDidUpdate(prevProps) {
    //     const { filters, orderBy, page, pageSize } = this.props;
    //     if (prevProps.page !== this.props.page)
    //         this.props.actions.loadPosts(filters.filter, orderBy, page, pageSize);
    // }

    loadMore = () => {
        const { filters, orderBy, page, pageSize } = this.props;
        this.props.actions.loadPosts(filters.filter, orderBy, pageSize, 'more');
    }

    render() {
        const { postsLoading, onPropertyChange, filters } = { ...this.props };
        const posts = this.props.posts;
        return (
            <div>
                <TextField label="Filter" value={filters.filter} onChange={onPropertyChange} />
                <Button onClick={this.loadMore} disabled={postsLoading}>Load more...</Button>
                {postsLoading && (<div>Loading</div>)}
                {posts && posts.map(p => (
                    <Post key={p.id} {...p} />
                ))}
            </div>
        );
    }
}