//This is a tutorial I am following

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const request = require('request');
const path = require('path');
const PORT = process.env.PORT || 5000;


// API KEY - pk_a2adab08a5e54d369cbfd38e8a623f17
// Creta API call function

function call_api(finishedAPI){
request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_a2adab08a5e54d369cbfd38e8a623f17', { json: true }, (err, res, body) => {
	if (err) { return console.log(err);}
	if (res.statusCode === 200){
		//console.log(body);
		finishedAPI (body);
	};
});
}

// Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set handlebar routes
app.get('/', function (req, res) {
	call_api(function(doneAPI){
		res.render('home',{
    	stock: doneAPI
     });
	});
});

//Create about page

app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT,() => console.log('Server Listening on port '+ PORT));
