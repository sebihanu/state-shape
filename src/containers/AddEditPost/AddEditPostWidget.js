import React, { PureComponent } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { getInt } from 'utils/functions'
import EditPost from 'components/Posts/EditPost'
import { getPost as getPostSelector } from 'selectors/posts'
import { getPost as getPostAction, addUpdatePost } from 'actions/posts'

const getPostId = props => {
    return getInt(props.match.params.postId);
}
class AddEditPostWidget extends PureComponent {
    state = {
        post: null
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

    componentDidUpdate(prevProps) {
        if (!prevProps.postSaved && this.props.postSaved) {
            this.props.history.goBack();
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.post && !state.post) {
            return {
                post: { ...props.post }
            }
        }

        return null;
    }

    handlePropertyChange = prop => ev => {
        const val = ev.target.value;
        this.setState(prevState => ({ post: { ...prevState.post, [prop]: val } }));
    }

    handleSave = () => {        
        this.props.actions.addUpdatePost(this.state.post);
    }

    render() {
        const { postLoading, postLoaded, postSaving } = this.props;
        const { post } = this.state;
        return (
            <div>                
                {postLoading &&
                    <div>Loading</div>
                }
                {postLoaded &&
                    <React.Fragment>
                        <Button onClick={() => this.props.history.goBack()}>Back</Button>
                        <EditPost {...post} onPropertyChange={this.handlePropertyChange} onSave={this.handleSave} saving={postSaving} />
                    </React.Fragment>
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
        postLoading: state.editPosts[postId] && state.editPosts[postId].loading,
        postSaving: state.updatedPosts[postId] && state.updatedPosts[postId].saving,
        postSaved: state.updatedPosts[postId] && state.updatedPosts[postId].saved
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ getPostAction, addUpdatePost }, dispatch)
    };
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddEditPostWidget);