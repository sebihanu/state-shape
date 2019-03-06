import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Comment from './Comment';

export default class MyBlogComments extends PureComponent {
    componentDidMount() {
        const { blogId, pageSize } = this.props;
        this.props.actions.loadBlogComments(blogId, pageSize);
    }

    loadMore = () => {
        const { blogId, pageSize } = this.props;
        this.props.actions.loadBlogComments(blogId, pageSize, 'more');
    }

    render() {
        const { comments, commentsLoading } = { ...this.props };        
        return (
            <div>
                <Button onClick={this.loadMore} disabled={commentsLoading}>Load more...</Button>
                {commentsLoading && (<div>Loading</div>)}
                {comments && comments.map(c => (
                    <Comment key={c.id} {...c} />
                ))}
            </div>
        );
    }
}

MyBlogComments.propTypes = {
    pageSize: PropTypes.number.isRequired,
    comments: PropTypes.array,
    commentsLoading: PropTypes.bool.isRequired
};