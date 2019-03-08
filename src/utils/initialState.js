const initialState = {
    entities: {},
    currentUser: {
        id: 1,
        blogId: null,
        blogLoading: false,
        blogLoaded: false
    },
    comments: {
        blogComments: {},
        postComments: {},
        postReplies: {}
    },
    posts: {
        viewPosts: {},
        editPosts: {}
    }    
};

export default initialState;