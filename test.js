const BlogPost = require('./models/BlogPost');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/transcendworxBlog')
const createBlogPost = async () => {
    const blogpost = await BlogPost.create({
        title: 'test title',
        body: 'lorem ipsum'
    });
    console.log(blogpost);
};

const findBlogPosts = async () => {
    const blogposts = await BlogPost.find({});
    console.log(blogposts);
};

createBlogPost();
findBlogPosts();


