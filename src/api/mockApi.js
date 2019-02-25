
const users = [
    { id: 1, name: 'User1', },
    { id: 2, name: 'User2' },
    { id: 3, name: 'User3' }];
const categories = [
    { id: 1, name: 'Category1', },
    { id: 2, name: 'Category2' },
    { id: 3, name: 'Category3' }];
const subCategories = [
    { id: 1, name: 'SubCategory11', categoryId: 1 },
    { id: 2, name: 'SubCategory12', categoryId: 1 },
    { id: 3, name: 'SubCategory21', categoryId: 2 }];
const labels = [
    { id: 1, name: 'Label1' },
    { id: 2, name: 'Label2' },
    { id: 3, name: 'Label3' }];

const blogs = [
    { id: 1, name: 'Blog1', ownerId: 1, subCategoryId: 1 },
    { id: 2, name: 'Blog2', ownerId: 2, subCategoryId: 2 },
    { id: 3, name: 'Blog3', ownerId: 3, subCategoryId: 3 }];

const posts = [
    { id: 1, name: 'Post11', blogId: 1, labels: [1, 2], updated: '2019-01-31T00:00:00.000Z', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { id: 2, name: 'Post12', blogId: 1, labels: [3], updated: '2019-01-31T00:00:00.000Z', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { id: 2, name: 'Post21', blogId: 2, labels: [], updated: '2019-01-31T00:00:00.000Z', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }];

const comments = [
    { id: 1, content: 'Comment11', postId: 1, userId: 1, created: '2019-01-31T00:00:00.000Z' },
    { id: 2, content: 'Comment12', postId: 1, userId: 2, created: '2019-01-31T00:00:00.000Z' },
    { id: 3, content: 'Comment13', postId: 1, userId: 1, created: '2019-01-31T00:00:00.000Z' }];

const delay = 400

export class MockApi {
    static get = (result) => {
        debugger
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], result));
            }, delay);
        });
    }
    
    static getUsers = () => this.get(users);
    static getCategories = () => this.get(categories);
    static getSubCategoriesByCategory = (categoryId) => {
        return this.get(subCategories.filter(a => a.categoryId === categoryId));
    };

    static getPostsByBlog(filter, orderBy, paginationInfo){
        return this.get(posts);
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

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}