const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({});
    console.log(blogposts);
    console.log(req.session);
    res.render('bloghome', { blogposts });
}