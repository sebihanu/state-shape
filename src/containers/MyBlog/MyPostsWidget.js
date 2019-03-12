import React, { PureComponent } from "react";
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { loadPosts } from 'actions/posts';
import { getPosts, getPostsLoading } from 'selectors/posts'
import MyPostsComponent from 'components/Posts/MyPosts'

class MyPostsWidget extends PureComponent {
    // constructor(props) {
    //     super(props);
    //     this.state = { inEditFilters: { ...props.filters } };
    // }
    state = {
        inEditFilters: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.inEditFilters && nextProps.filtersLoaded)
            return { inEditFilters: nextProps.filters }

        return null;
    }

    componentDidMount() {
        // const { page, pageSize, blogId } = this.props;
        // const { filter, orderBy } = this.props.filters;
        // this.props.actions.loadPosts(filter, blogId, orderBy, page, pageSize);
        setTimeout(() => {
            this.props.search({ filter: '', orderBy: 'latest' })();
        }, 1000);
    }

    componentDidUpdate(prevProps) {
        const { page, pageSize, blogId } = this.props;
        const { filter, orderBy } = this.props.filters;
        if (prevProps.filters !== this.props.filters ||
            prevProps.page !== page) {
            this.props.actions.loadPosts(filter, blogId, orderBy, page, pageSize);
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
                {filtersLoaded ? (<MyPostsComponent {...myPostsComponentProps} />)
                    : (<div>Filters loading ...</div>)
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { page, pageSize } = ownProps;
    const { filter, orderBy } = ownProps.filters;
    const blogId = state.currentUser.blogId;

    const posts = getPosts(filter, blogId, orderBy, page, pageSize, state);
    const loading = getPostsLoading(filter, blogId, orderBy, page, pageSize, state);

    return {
        posts: posts,
        postsLoading: loading,
        blogId: blogId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ loadPosts }, dispatch)
    };
}

const MyPostsWidgetConnected = compose(connect(mapStateToProps, mapDispatchToProps))(MyPostsWidget);

class MyPostsWidgetLocalState extends PureComponent {
    state = {
        filters: {},
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