const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-viktorb:5BSaPIkpzAfTQ3T6@cluster0.ln2np.mongodb.net/transcendworxDB?retryWrites=true&w=majority&appName=Cluster0');

const app = new express();

const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');

const bloghomeController = require('./controllers/home.js');
const newPostController = require('./controllers/newPost.js');
const getPostController = require('./controllers/getPost.js');
const storePostController = require('./controllers/storePost.js');
const loginController = require('./controllers/login.js');
const loginUserController = require('./controllers/loginUser.js');
const storeUserController = require('./controllers/storeUser.js');
const newUserController = require('./controllers/newUser.js');
const authMiddleware = require('./middleware/authMiddleware.js');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware.js');
const validationMiddleware = require('./middleware/validationMiddleware.js');
const logoutController = require('./controllers/logout.js');

app.set("view engine", "ejs");

global.loggedIn = null;

//express middleware 
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use('/posts/store', validationMiddleware);
app.use(session(
    {
        secret: 'keyboard dog',
        resave: true,
        saveUninitialized: true
    }
));
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});
app.use(flash());

//Routes

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/team', (req, res) => {
    res.render('team');
});
app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/bloghome', bloghomeController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.post('/posts/store', authMiddleware, storePostController);

app.use((req, res) => {
    res.render('notfound');
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

