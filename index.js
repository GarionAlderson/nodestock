//This is a tutorial I am following

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');

const path = require('path');
const PORT = process.env.PORT || 5000;

//use middlewar bodyParser

app.use(bodyParser.urlencoded({extended: false}));


// API KEY - pk_a2adab08a5e54d369cbfd38e8a623f17
// Creta API call function

function call_api(finishedAPI, ticker){
request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_a2adab08a5e54d369cbfd38e8a623f17', { json: true }, (err, res, body) => {
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

//Set handlebar index GET route
app.get('/', function (req, res) {
	call_api(function(doneAPI){
		res.render('home',{
    	stock: doneAPI
     });
	}, 'fb');
});


//Set handlebar index POST route
app.post('/', function (req, res) {
	call_api(function(doneAPI){
		//posted_stuff = req.body.stock_ticker;
		res.render('home',{
    	stock: doneAPI,
        });
	}, req.body.stock_ticker );
});

//Create about page

app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT,() => console.log('Server Listening on port '+ PORT));
