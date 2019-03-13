import React, { PureComponent } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import EditPost from 'components/Posts/EditPost'
import { getPost as getPostSelector } from 'selectors/posts'
import { getPost as getPostAction, addUpdatePost } from 'actions/posts'

class AddEditPostWidget extends PureComponent {
    state = {
        post: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.postLoaded && !prevState.post) {
            return {
                post: { ...nextProps.post }
            }
        }

        return null;
    }

    componentDidMount() {
        const { isNew, postId } = this.props;
        if (!isNew()) {            
            this.props.actions.getPostAction(postId);
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.postSaved && this.props.postSaved) {
            this.props.goBack();
        }
    }    

    handlePropertyChange = prop => ev => {
        const val = ev.target.value;
        this.setState(prevState => ({ post: { ...prevState.post, [prop]: val } }));
    }

    handleSave = () => {
        this.props.actions.addUpdatePost(this.state.post);
    }

    render() {
        const { postLoading, postLoaded, postSaving, goBack } = this.props;
        const { post } = this.state;
        return (
            <div>
                {postLoading &&
                    <div>Loading</div>
                }
                {postLoaded &&
                    <React.Fragment>
                        <Button onClick={goBack}>Back</Button>
                        <EditPost {...post} onPropertyChange={this.handlePropertyChange} onSave={this.handleSave} saving={postSaving} />
                    </React.Fragment>
                }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { postId } = ownProps;
    return {
        post: getPostSelector(postId, state),
        postLoaded: state.posts.editPosts[postId] && state.posts.editPosts[postId].loaded,
        postLoading: state.posts.editPosts[postId] && state.posts.editPosts[postId].loading,
        postSaving: state.posts.editPosts[postId] && state.posts.editPosts[postId].saving,
        postSaved: state.posts.editPosts[postId] && state.posts.editPosts[postId].saved
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ getPostAction, addUpdatePost }, dispatch)
    };
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddEditPostWidget);