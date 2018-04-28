'use strict';

const mongoose = require('mongoose'), 
	express = require('express'),
	app = express();

mongoose.connect('mongodb://localhost/semantic_blog');

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// MONGOOSE MODEL CONFIG
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

const Blog = mongoose.model('Blog', blogSchema);

// RESTFUL ROUTES
app.get('/', (req, res) => {
	res.redirect('/blogs');
});

// INDEX ROUTE
app.get('/blogs', (req, res) => {
	Blog.find({}, function(err, blogs) {
		if (err) console.log(err);
		else res.render('index', {blogs: blogs});
	});
});

// NEW ROUTE
app.get('/blogs/new', (req, res) => {
	res.render('new');
});

// CREATE ROUTE
app.post('/blogs', (req, res) => {
	Blog.create(req.body.blog, function(err, newBlog) {
		if (err) res.render('new');
		else res.redirect('/blogs');
	});
});

// SHOW ROUTE
app.get('/blogs/:id', (req, res) => {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) res.redirect('/blogs');
		else res.render('show', {blog: foundBlog});
	});
});

app.listen(3000, () => console.log('Server has started!'));