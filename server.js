//required for express requests
var express = require('express')
var app = express()
//required for POST requests
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//required to access static html
app.use(express.static('client'));
//require some pre-defined JSON data
var recipes = require('./potato_recipes.json');

//Access client side at http://127.0.0.1:8090/index.html

// GET method route
app.get('/', function(req, resp){
	resp.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, resp) {
	resp.send('POST request to the homepage')
})

// GET method with a specified URL
app.get('/secret', function(req, resp){
	console.log('Accessing the secret section...')
	resp.send('Secret')
})


// GET method with parameters
app.get('/character/:name-:species', function(req, resp){
	console.log('valid URL')
	resp.send(req.params)
})

//////////////////////////
// Random numbers example
// GET with parameters
app.get('/random/:max', function(req, resp){
  max = parseInt(req.params.max)
  rand = Math.floor(Math.random()*max) +1
  console.log('Max via url is ' + max + ' rand is ' + rand)
  resp.send('' + rand)
})

app.get('/r', function(req, resp){
  max = parseInt(req.query.max)
  rand = Math.floor(Math.random()*max) +1
  console.log('Max via query is ' + max + ' rand is ' + rand)
  resp.send('' + rand)
})
/////////////////////////

//GET with query
app.get('/w', function(req,resp){
	person = req.query.person
	console.log('query successful')
	resp.send(person)
})

//GET with query from form
app.get('/user', function(req,resp){
	name = req.query.name
	email = req.query.email
	console.log('query params collected')
	resp.send('Welcome ' + name + '! You have subsribed with the email: '+email)
	
})

//POST with query from form
app.post('/new', function(req,resp){
	name = req.body.name
	email = req.body.email
	console.log('query params collected')
	resp.send('Welcome ' + name + '! You have subsribed with the email: '+email)
	
})


/////////////////////////////////
//Query JSON data example
//GET request with query
app.get('/w',function(req,resp){
	query = req.query.recipe
	var results = []
	for(var x in recipes){
		var obj = recipes[x]
		console.log(obj)
		if (obj['title'].toUpperCase().includes(query.toUpperCase())){
			results.push(obj)
		}
	}
	
	resp.send(results)
	
})
//////////////////////////////////

//////////////////////////////////
//Add data to JSON exmaple
//POST method to add new recipe 
app.post('/new', function(req,resp){
	var obj = new Object();
	obj.title = req.body.title
	obj.href = req.body.href
	obj.ingredients = req.body.ingredients
	obj.thumbnail = req.body.thumbnail
	
	console.log('success')
	recipes.push(obj)
	resp.send(obj)
	
})
/////////////////////////////////

let list = [ 'piano', 'concertina', 'double bass'];

// GET method with list
app.get('/list', function(req, resp){
	resp.send(list)
})



app.listen(8090)
