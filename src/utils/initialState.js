const initialState = {
    entities: {
        posts: {},
        users: {},
        comments: {}
    },
    myLatestPosts: {
        ids: [],
        mapIds: new Map(),
        loading: false,
        loaded: false
    }
};

export default initialState;