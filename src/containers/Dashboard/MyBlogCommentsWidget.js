import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { loadBlogComments } from 'actions/comments';
import { getComments, getCommentsPageLoading } from 'selectors/blogComments'
import MyBlogComments from 'components/Comments/MyBlogComments'

class MyBlogCommentsWidget extends PureComponent {
    componentDidMount() {
        const { blogId, page, pageSize } = this.props;
        this.props.actions.loadBlogComments(blogId, page, pageSize);
    }

    componentDidUpdate(prevProps) {
        const { blogId, page, pageSize } = this.props;

        if (this.props.page === 0) {
            this.props.loadMore();
        } else if (prevProps.page !== page) {
            this.props.actions.loadBlogComments(blogId, page, pageSize);
        }
        //TODO ???
        if (this.props.page && prevProps.page && this.props.commentsInvalid) {
            this.props.resetPage();
        }
    }

    render = () => {
        const { comments, commentsLoading, loadMore } = this.props;
        const myBlogCommentsProps = { comments, commentsLoading, loadMore };
        return (
            <MyBlogComments {...myBlogCommentsProps} />
        );
    }
}

MyBlogCommentsWidget.propTypes = {
    comments: PropTypes.array.isRequired,
    commentsLoading: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    blogId: PropTypes.number.isRequired,
    actions: PropTypes.shape({
        loadBlogComments: PropTypes.func.isRequired
    }).isRequired
};

function mapStateToProps(state, ownProps) {
    const blogId = state.currentUser.blogId;
    const comments = getComments(blogId, ownProps.page, ownProps.pageSize, state);
    const commentsLoading = getCommentsPageLoading(blogId, ownProps.page, ownProps.pageSize, state);    
    const commentsInvalid = state.comments.invalid;

    return {
        comments: comments,
        commentsLoading: commentsLoading,
        commentsInvalid: commentsInvalid,
        blogId: blogId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadBlogComments: (blogId, page, pageSize) => dispatch(loadBlogComments(blogId, page, pageSize))
        }
    };
}

const MyBlogCommentsConnected = compose(connect(mapStateToProps, mapDispatchToProps))(MyBlogCommentsWidget);

class MyBlogCommentsLocalState extends PureComponent {
    state = { page: 1 }

    loadMore = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }));
    }

    resetPage = () => {
        this.setState({ page: 0 });
    }

    render() {
        return (
            <MyBlogCommentsConnected {...this.props} {...this.state}
                loadMore={this.loadMore} resetPage={this.resetPage} />
        );
    }
}

MyBlogCommentsLocalState.propTypes = {
    pageSize: PropTypes.number.isRequired
};

export default MyBlogCommentsLocalState;