import React, { PureComponent } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { getInt } from 'utils/functions'
import EditPost from 'components/Posts/EditPost'
import { getPost as getPostSelector } from 'selectors/posts'
import { getPost as getPostAction } from 'actions/posts'

const getPostId = props => {
    return getInt(props.match.params.postId);
}
class AddEditPostWidget extends PureComponent {
    state = {

    }

    isNew() {
        return this.props.match.params.newPost === 'new';
    }

    componentDidMount() {
        if (!this.isNew()) {
            const postId = getPostId(this.props);
            this.props.actions.getPostAction(postId);
        }
    }

    render() {
        const { postLoading, postLoaded, post } = this.props;
        return (
            <div>
                <div>{this.isNew() ? "new" : "edit"} - {getPostId(this.props)}</div>
                {postLoading && 
                    <div>Loading</div>
                }
                {postLoaded &&
                    <EditPost {...post} />
                }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const postId = getPostId(ownProps);
    return {
        post: getPostSelector(postId, state),
        postLoaded: state.editPosts[postId] && state.editPosts[postId].loaded,
        postLoading: state.editPosts[postId] && state.editPosts[postId].loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ getPostAction }, dispatch)
    };
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddEditPostWidget);