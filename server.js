const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('currentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
	return text.toUpperCase();
});

app.use((req,res,next) => {
	var now = new Date().toString();

	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server log file.');
		}
	});
	next();
});

// app.use((req,res,next) => {
// 	res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	// res.send({
	// 	name: 'Shashank',
	// 	likes:[
	// 		'Biking',
	// 		'Cycling',
	// 		'Trekking'
	// 	]
	// });
	res.render('home.hbs',{
		pageTitle: 'Template demo',
		pageHeading: 'Home Page',
		welcomeText: 'Welcome to template demo website!!'
	})
});

app.get('/about', (req,res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page',
		pageHeading: 'This is about page'
	})
});

app.get('/bad', (req,res) => {
	res.send({
		errorMessage: 'Bad request'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});