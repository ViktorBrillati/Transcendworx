const BlogPost = require('../models/BlogPost.js');
const path = require('path');

module.exports = async (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/images', image.name),
        async (error) => {
        await BlogPost.create({
            ...req.body,
            image: '/image/' + image.name,
            userid: req.session.userId
        });
        console.log(req.body);
        res.redirect('/bloghome');
        }
    );
}