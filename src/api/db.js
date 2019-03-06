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

// const blogs = [
//     { id: 1, name: 'Blog1', ownerId: 1, subCategoryId: 1 },
//     { id: 2, name: 'Blog2', ownerId: 2, subCategoryId: 2 },
//     { id: 3, name: 'Blog3', ownerId: 3, subCategoryId: 3 }];

// const posts = [
//     { id: 1, name: 'Post11', blogId: 1, labels: [1, 2], updated: new Date('2019-01-31T00:00:00.000Z'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
//     { id: 2, name: 'Post12', blogId: 1, labels: [3], updated: new Date('2019-01-31T00:00:00.000Z'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
//     { id: 3, name: 'Post21', blogId: 2, labels: [], updated: new Date('2019-01-31T00:00:00.000Z'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }];

// const comments = [
//     { id: 1, content: 'Comment11', postId: 1, userId: 1, created: '2019-01-31T00:00:00.000Z' },
//     { id: 2, content: 'Comment12', postId: 1, userId: 2, created: '2019-01-31T00:00:00.000Z' },
//     { id: 3, content: 'Comment13', postId: 1, userId: 1, created: '2019-01-31T00:00:00.000Z' }];

const db = (blogsCount = 10, postsCount = 10, commentsCount = 10) => {
    let blogsResult = [];
    let postsResult = [];
    let commentsResult = [];

    for (let i = 1; i <= blogsCount; i++) {
        const blog = { id: i, name: `Blog-${i}`, ownerId: users[i % users.length].id, subCategoryId: subCategories[i % subCategories.length].id };
        blogsResult.push(blog)

        for (let j = 1; j <= postsCount; j++) {
            const postId = (i - 1) * postsCount + j;
            const post = {
                id: postId, name: `Post-${i}-${j}`, blogId: blog.id, labels: [1, 2],
                updated: new Date(2019, i % 11, j % 25), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            }
            postsResult.push(post)

            for (let k = 1; k <= commentsCount; k++) {
                const commentId = (i - 1) * postsCount * commentsCount + (j - 1) * commentsCount + k;
                const comment = { id: commentId, content: `Comment-${i}-${j}-${k}`, postId: post.id, 
                userId: users[k % users.length].id, created: new Date(2019, i % 11, j % 25), blogId: blog.id }

                commentsResult.push(comment);
            }
        }
    }

    return {
        users,
        categories,
        subCategories,
        labels,
        blogs: blogsResult,
        posts: postsResult,
        comments: commentsResult
    };
};

export default db;