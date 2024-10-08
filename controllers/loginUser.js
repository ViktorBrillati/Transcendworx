const bcrypt = require('bcrypt');
const User = require('../models/User.js');

module.exports = async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username: username });
    
    if (user) {
        const same = await bcrypt.compare(password, user.password);
        
        if (same) {
            req.session.userId = user._id;
            res.redirect('/bloghome');
        } else {
            res.redirect('/auth/login');
        }
    } else {
        res.redirect('/auth/login');
    }
}