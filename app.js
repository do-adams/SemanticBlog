'use strict';

const mongoose = require('mongoose'), 
	express = require('express'),
	app = express();

mongoose.connect('mongodb://localhost/semantic_blog');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.send());

app.listen(3000, () => console.log('Server has started!'));