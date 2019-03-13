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
        postReplies: {},        
        invalid: false
    },
    posts: {
        viewPosts: {},
        editPosts: {}
    }    
};

export default initialState;