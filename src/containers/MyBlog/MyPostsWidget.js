import React, { PureComponent } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { loadPosts } from 'actions/posts';
import { getPosts, getPostsLoading } from 'selectors/myPosts'
import MyPostsComponent from 'components/Posts/MyPosts'

class MyPostsWidget extends PureComponent {
    state = {
        editFilters: {
            filter: '',
            orderBy: 'latest'
        },
        itemsFilters: {
            filter: '',
            orderBy: 'latest'
        }
    }

    handlePropertyChange = prop => ev => {
        const val = ev.target.value;
        this.setState(prevState => ({
            editFilters: { ...prevState.editFilters, [prop]: val }
        }));
    }

    handleSearch = () => {
        this.setState(prevState => {            
            return {
                itemsFilters: { filter: prevState.editFilters.filter, orderBy: prevState.editFilters.orderBy }
            }
        });
    }

    render() {
        return (
            <MyPostsComponentConnected
                onPropertyChange={this.handlePropertyChange}
                search={this.handleSearch}
                {...this.state}
                pageSize={this.props.pageSize} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    const posts = getPosts(ownProps.itemsFilters.filter, ownProps.itemsFilters.orderBy, ownProps.pageSize, state);
    const loading = getPostsLoading(ownProps.itemsFilters.filter, ownProps.itemsFilters.orderBy, ownProps.pageSize, state);
    return {
        posts: posts,
        postsLoading: loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ loadPosts }, dispatch)
    };
}

const MyPostsComponentConnected = compose(connect(mapStateToProps, mapDispatchToProps))(MyPostsComponent);
export default MyPostsWidget;