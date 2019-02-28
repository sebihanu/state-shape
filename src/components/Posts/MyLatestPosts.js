import React, { PureComponent } from "react";
import { Button } from '@material-ui/core';
import Post from './Post';

export default class MyLatestPosts extends PureComponent {
    componentDidMount() {
        const { filter, orderBy, page, pageSize } = this.props;
        this.props.actions.loadPosts(filter, orderBy, page, pageSize);
    }
    componentDidUpdate(prevProps) {
        const { filter, orderBy, page, pageSize } = this.props;
        if (prevProps.page !== this.props.page)
            this.props.actions.loadPosts(filter, orderBy, page, pageSize);
    }

    render() {
        const { postsLoading, loadMore } = { ...this.props };
        const posts = this.props.posts;
        return (
            <div>
                <Button onClick={loadMore} disabled={postsLoading}>Load more...</Button>
                {postsLoading && (<div>Loading</div>)}
                {posts && posts.map(p => (
                    <Post key={p.id} {...p} />
                ))}
            </div>
        );
    }
}