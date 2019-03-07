import data from './db'

const delay = 2000
const db = data(5, 10, 8);

export class MockApi {
    static get = (result) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign({}, result));
            }, delay);
        });
    }

    static getUsers = () => this.get(db.users);
    static getCategories = () => this.get(db.categories);
    static getSubCategoriesByCategory = (categoryId) => {
        return this.get(db.subCategories.filter(a => a.categoryId === categoryId));
    };

    static getPostsByBlog(filter, blogId, orderBy, page, pageSize) {
        const filtered = db.posts.filter(p => ((p.blogId === blogId)
            && (p.name.includes(filter) || p.content.includes(filter))));
        const ordered = filtered.sort((a, b) => {
            if (orderBy === 'latest') {
                return b.updated - a.updated;
            } else if (orderBy === 'oldest') {
                return a.updated - b.updated;
            }

            return a.id - b.id;
        });

        const paged = ordered.slice((page - 1) * pageSize, page * pageSize);

        let result = paged.map(p => {
            const postLabels = (p.labels || []).map(id => db.labels.find(x => x.id === id));
            const postComments = db.comments.filter(c => c.postId === p.id);

            return { ...p, labels: postLabels, comments: postComments };
        });
        return MockApi.get(result);
    }

    static getBlogByOwner(ownerId) {
        const blog = db.blogs.find(b => b.ownerId === ownerId);
        const owner = db.users.find(u => u.id === ownerId);
        const subCategory = db.subCategories.find(s => s.id === blog.subCategoryId);
        const category = db.categories.find(c => c.id === subCategory.id);
        let result = {
            ...blog,
            owner: {
                id: owner.id,
                name: owner.name
            },
            subCategory: {
                id: subCategory.id,
                name: subCategory.name,
                category: { ...category }
            }
        };

        delete result.ownerId;
        delete result.subCategoryId;

        return MockApi.get(result);
    }

    static getCommentsByBlog(blogId, page, pageSize) {
        const filtered = db.comments.filter(c => c.blogId === blogId);
        const ordered = filtered.sort((a, b) => {
            return b.created - a.created;
        });

        const paged = ordered.slice((page - 1) * pageSize, page * pageSize);

        let result = paged.map(c => {


            return { ...c };
        });
        return MockApi.get(result);
    }

    static getPost(postId) {
        let post = db.posts.find(p => p.id === postId);
        const postLabels = (post.labels || []).map(id => db.labels.find(x => x.id === id));
        const result = { ...post, labels: postLabels };
        return MockApi.get(result);
    }

    static updatePost(post) {
        const dbPost = db.posts.find(p => p.id === post.id);
        dbPost.name = post.name;
        dbPost.content = post.content;
        return MockApi.get(null);
    }


    //UC0: getUsers; getCategories; getSubCategoriesByCategory; getLabels
    //UC0': getUsersByName; getCategoriesByName; getSubCategoriesByCategoryAndName; getLabelsByName

    //UC1: getBlogByOwner {blog: top 10 posts: [top 10 { comments: [] }]}
    //UC2: getPostsByBlog posts[ top 10 comment[]]
    //UC3: getCommentsByPost comments[]

    //UC4: getLatestCommentsByBlogId comments[ post: {}]

    //UC5: getLatestPosts posts[blog, top 10 comments[]]

    //UC6 getBlogsByUsername blogs[top 10 posts: [top 10 { comments: [] }]]
}