//require out BlogPost model so we can do CRUD 
const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    console.log(req.body);
    await BlogPost.create(req.body);
    res.redirect('/blog');
};