const initialState = {
    entities: {
        posts: {},
        users: {},
        comments: {}
    },
    currentUser: {
        id: 1,
        blogId: null,
        blogLoading: false,
        blogLoaded: false
    },
    posts: {}    
};

export default initialState;