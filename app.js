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

app.get('/blogs', (req, res) => {
	Blog.find({}, function(err, blogs) {
		if (err) console.log(err);
		else res.render('index', {blogs: blogs});
	});
});

app.listen(3000, () => console.log('Server has started!'));