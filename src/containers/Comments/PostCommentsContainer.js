import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { connect } from 'react-redux';
import PostComments from 'components/Comments/PostComments'
import { loadPostComments, reply } from 'actions/comments';
import { getComments, getCommentsLoading } from 'selectors/postComments'

class PostCommentsContainer extends PureComponent {
    state = {
        show: false,
        newComment: ''
    }

    componentDidUpdate(prevProps) {
        const { postId, page, pageSize } = this.props;
        if (prevProps.page !== page) {
            this.props.actions.loadPostComments(postId, page, pageSize);
        }
    }

    reply = () => {
        const { postId } = this.props;
        const { newComment } = this.state;
        this.props.actions.reply(postId, newComment);

        setTimeout(() => {
            this.props.loadFirstPage();
        }, 1000);
    }

    handleSwitchChange = event => {
        this.setState({ show: event.target.checked }, () => {
            const { postId, page, pageSize } = this.props;
            this.props.actions.loadPostComments(postId, page, pageSize);
        });
    }

    handlePropertyChange = prop => ev => {
        this.setState({ [prop]: ev.target.value });
    }

    render() {
        return (
            <PostComments {...this.props} {...this.state}
                onSwitchChange={this.handleSwitchChange}
                onPropertyChange={this.handlePropertyChange}
                reply={this.reply} />
        );
    }
}

PostCommentsContainer.propTypes = {
    postId: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
    const { postId, page, pageSize } = ownProps;
    const comments = getComments(postId, page, pageSize, state);
    const loading = getCommentsLoading(postId, page, pageSize, state);
    const replying = true;
    return {
        comments: comments,
        commentsLoading: loading,
        replying
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadPostComments: (postId, page, pageSize) => dispatch(loadPostComments(postId, page, pageSize)),
            reply: (postId, comment) => dispatch(reply(postId, comment))
        }
    };
}

const PostCommentsContainerConnected = compose(connect(mapStateToProps, mapDispatchToProps))(PostCommentsContainer);

class PostCommentsContainerLocalState extends PureComponent {
    state = {
        page: 1
    }

    loadMore = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }));
    }

    loadFirstPage = () => {
        this.setState({ page: 1 });
    }

    render() {
        return (
            <PostCommentsContainerConnected {...this.props} {...this.state}
                loadMore={this.loadMore} loadFirstPage={this.loadFirstPage} />
        );
    }
}

export default PostCommentsContainerLocalState;