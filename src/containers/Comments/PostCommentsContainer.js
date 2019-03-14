import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { connect } from 'react-redux';
import PostComments from 'components/Comments/PostComments'
import { loadPostComments, reply } from 'actions/comments';
import { getComments, getCommentsLoading, getReplying, getReplied } from 'selectors/postComments'

class PostCommentsContainer extends PureComponent {
    state = {
        show: false,
        newComment: ''
    }

    componentDidUpdate(prevProps) {
        const { postId, page, pageSize, replying, replied } = this.props;

        if (this.props.page === 0) {
            this.props.loadMore();
        } else if (prevProps.page !== page) {
            this.props.actions.loadPostComments(postId, page, pageSize);
        }
        
        if (prevProps.replying && !replying && replied) {
            //console.warn(`${postId}-${prevProps.replying}-${prevProps.replied}-${replying}-${replied}`);
            this.setState({ newComment: '' });
            this.props.resetPage();
        }
    }

    reply = () => {
        const { postId } = this.props;
        const { newComment } = this.state;
        this.props.actions.reply(postId, newComment);        
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
    const replying = getReplying(postId, state);
    const replied = getReplied(postId, state);
    return {
        comments: comments,
        commentsLoading: loading,
        replying: replying,
        replied: replied
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

    resetPage = () => {
        this.setState({ page: 0 });
    }

    render() {
        return (
            <PostCommentsContainerConnected {...this.props} {...this.state}
                loadMore={this.loadMore} resetPage={this.resetPage} />
        );
    }
}

export default PostCommentsContainerLocalState;