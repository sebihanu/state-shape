const initialState = {
    entities: {
        posts: {},
        users: {},
        comments: {}
    },
    myLatestPosts: {
        ids: [],
        mapIds: {},
        loading: false,
        loaded: false
    }
};

export default initialState;