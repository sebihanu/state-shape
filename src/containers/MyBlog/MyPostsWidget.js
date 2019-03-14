import React, { PureComponent } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { loadPosts, loadPostsFilters } from 'actions/posts';
import { getPosts, getPostsLoading } from 'selectors/posts'
import MyPosts from 'components/Posts/MyPosts'

class MyPostsWidget extends PureComponent {
    state = {
        inEditFilters: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.inEditFilters && nextProps.filtersLoaded)
            return { inEditFilters: nextProps.filters }

        return null;
    }

    componentDidMount() {
        const { defaultFiltersLoaded, defaultFilters } = this.props;
        if (!defaultFiltersLoaded) {
            this.props.actions.loadPostsFilters();
        } else {
            this.props.search(defaultFilters)();
        }
    }

    componentDidUpdate(prevProps) {
        const { page, pageSize, blogId, defaultFiltersLoading, defaultFiltersLoaded, defaultFilters } = this.props;

        if (this.props.filters) {
            const { filter, orderBy } = this.props.filters;
            if (prevProps.filters !== this.props.filters ||
                prevProps.page !== page) {
                this.props.actions.loadPosts(filter, blogId, orderBy, page, pageSize);
            }
        }

        if (prevProps.defaultFiltersLoading && !defaultFiltersLoading && defaultFiltersLoaded) {
            this.props.search(defaultFilters)();
        }
    }
    handlePropertyChange = prop => ev => {
        const val = ev.target.value;
        this.setState(prevState => ({
            inEditFilters: { ...prevState.inEditFilters, [prop]: val }
        }));
    }

    render() {
        const { posts, postsLoading, search, loadMore, filtersLoaded } = this.props;
        const myPostsComponentProps = {
            posts, postsLoading, search, loadMore,
            onPropertyChange: this.handlePropertyChange,
            filters: this.state.inEditFilters
        };
        return (
            <React.Fragment>
                {filtersLoaded ? (<MyPosts {...myPostsComponentProps} />)
                    : (<div>Filters loading ...</div>)
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { page, pageSize } = ownProps;
    const blogId = state.currentUser.blogId;

    let posts = null, loading = false;
    if (ownProps.filters) {
        const { filter, orderBy } = ownProps.filters;
        posts = getPosts(filter, blogId, orderBy, page, pageSize, state);
        loading = getPostsLoading(filter, blogId, orderBy, page, pageSize, state);
    }

    const defaultFilters = state.postsFilters.filters;
    const defaultFiltersLoaded = state.postsFilters.loaded;
    const defaultFiltersLoading = state.postsFilters.loading;

    return {
        posts: posts,
        postsLoading: loading,
        blogId: blogId,
        defaultFilters,
        defaultFiltersLoaded,
        defaultFiltersLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ loadPosts, loadPostsFilters }, dispatch)
    };
}

const MyPostsWidgetConnected = compose(connect(mapStateToProps, mapDispatchToProps))(MyPostsWidget);

class MyPostsWidgetLocalState extends PureComponent {
    state = {
        filters: null,
        filtersLoaded: false,
        page: 1
    }

    search = (filters) => () => {
        this.setState({
            filters: { filter: filters.filter, orderBy: filters.orderBy }, page: 1, filtersLoaded: true
        });
    }

    loadMore = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }));
    }

    render() {
        return (
            <MyPostsWidgetConnected {...this.props} {...this.state}
                search={this.search}
                loadMore={this.loadMore} />
        );
    }
}

export default MyPostsWidgetLocalState;