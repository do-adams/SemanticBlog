'use strict';

const mongoose = require('mongoose'), 
	express = require('express'),
	app = express();

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.send());

app.listen(3000, () => console.log('Server has started!'));