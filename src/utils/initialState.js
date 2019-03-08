const initialState = {
    entities: {},
    currentUser: {
        id: 1,
        blogId: null,
        blogLoading: false,
        blogLoaded: false
    },
    comments: {
        blogComments: {}
    },
    posts: {},
    editPosts: {},
    postComments: {},
    postReplies: {}
};

export default initialState;