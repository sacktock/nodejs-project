//required for express requests
var express = require('express');
var request = require('request');
var app = express();
//required for POST requests
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//required to access static html
app.use(express.static('client'));
//require some pre-defined JSON data
var recipes = require('./potato_recipes.json');
//api key for the api.moviedb.org
const api_key = 'api_key=f5a15381e863efaf6551e766d6b1088f'
var getAccessToken;
var page;
var genres;
var session_id;
var guest;

//Access client side at http://127.0.0.1:8090/index.html

//POST with query from form
app.post('/new', function(req,resp){
	name = req.body.name
	email = req.body.email
	console.log('query params collected')
	resp.send('Welcome ' + name + '! You have subsribed with the email: '+email)
	
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
function api_request(getAccessToken,callback){
	request(getAccessToken, function (error, response, body) {
		if (!error && response.statusCode == 200) {
            result = JSON.stringify(JSON.parse(body));          
            return callback(result, false);
        } else {            
            return callback(null, error);;
        }
	});
		
}

// GET method to search api
app.get('/search/movie', function(req, resp){
	var query = req.query.movie;
	getAccessToken = 'https://api.themoviedb.org/3/search/movie?'+
	api_key +
	'&query=' + 
	query;
	page = 1;
	console.log('api request at: '+getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data)
	});
});

app.get('/search/person', function(req, resp){
	var query = req.query.person;
	getAccessToken = 'https://api.themoviedb.org/3/search/person?'+
	api_key +
	'&query=' + 
	query;
	page = 1;
	console.log('api request at: '+getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data)
	});
});
/////////////////////////////////////////////////////////////
//GET method for finding next page of data
app.get('/page', function(req, resp){
	var next = req.query.next;
	if (next == 1){
		page +=1
	} else {
		page -=1
	}
	console.log('accessing page:' + String(page));
	getAccessToken += 
	'&page='+
	String(page);
	
	console.log('api request at: '+getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data)
	});
});
///////////////////////////////////////////////
//GET method for finding all details of a specific movie by id
app.get('/details/movie', function(req,resp){
	var query = req.query.id;
	var myAccessToken = 'https://api.themoviedb.org/3/movie/'+
	query +
	'?'+
	api_key;
	console.log('api request at: '+myAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data)
	});
});

app.get('/details/movie/credits', function(req,resp){
	var query = req.query.id;
	var myAccessToken = 'https://api.themoviedb.org/3/movie/'+
	query +
	'/credits'+
	'?'+
	api_key;
	console.log('api request at: '+myAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data)
	});
});

app.get('/details/person', function(req,resp){
	var query = req.query.id;
	var myAccessToken = 'https://api.themoviedb.org/3/person/'+
	query +
	'?'+
	api_key;
	console.log('api request at: '+myAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data)
	});
});

app.get('/details/person/movie/credits', function(req,resp){
	var query = req.query.id;
	var myAccessToken = 'https://api.themoviedb.org/3/person/'+
	query +
	'/movie_credits'+
	'?'+
	api_key;
	console.log('api request at: '+myAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data)
	});
});
////////////////////////////////////////////////////////////
app.get('/trending', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/trending/movie/day?'+
	api_key;
	page = 1;
	console.log('api request at: '+getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});

app.get('/genres', function(req,resp){
	var myAccessToken = 'https://api.themoviedb.org/3/genre/movie/list?'+
	api_key;
	console.log('api request at: ' +myAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
		genres = data.genres;
		console.log(genres);
	});
});

app.get('/discover/genre', function(req,resp){
	var id = req.query.genre;
	getAccessToken = 'https://api.themoviedb.org/3/discover/movie?'+
	api_key+
	'&sort_by=popularity.desc'+
	'&with_genres='+String(id);
	console.log('api request at: '+ getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});

app.get('/person/find/movie', function(req,resp){
	var id = req.query.id;
	getAccessToken = 'https://api.themoviedb.org/3/discover/movie?'+
	api_key+
	'&sort_by=popularity.desc'+
	'&with_people='+id;
	console.log('api request at: ' +getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});

app.get('/movie/similar', function(req,resp){
	var id = req.query.id;
	getAccessToken = 'https://api.themoviedb.org/3/movie/'+
	id+
	'/similar?'+
	api_key;
	console.log('api request at: ' +getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});

app.get('/discover/top_rated', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/movie/top_rated?'+
	api_key;
	console.log('api request at: '+ getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});

app.get('/discover/popular', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/movie/popular?'+
	api_key;
	console.log('api request at: '+ getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});

app.get('/discover/latest', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/movie/latest?'+
	api_key;
	console.log('api request at: '+ getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});

app.get('/discover/latest', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/movie/latest?'+
	api_key;
	console.log('api request at: '+ getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});

app.get('/discover/now_playing', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/movie/now_playing?'+
	api_key;
	console.log('api request at: '+ getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});

app.get('/discover/upcoming', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/movie/upcoming?'+
	api_key;
	console.log('api request at: '+ getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});


app.get('/person/popular', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/person/popular?'+
	api_key;
	console.log('api request at: ' +getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});


//Authentication methods
app.get('/authentication/token/new', function(req,resp){
	var myAccessToken ='https://api.themoviedb.org/3/authentication/token/new?'+
	api_key;
	console.log('api request at: '+myAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		guest =false;
		resp.send(data);
	});
	
});

app.get('/authentication/guest_session/new', function(req,resp){
	var myAccessToken = 'https://api.themoviedb.org/3/authentication/guest_session/new?'+
	api_key;
	console.log('api request at: '+myAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		guest=true;
		resp.send(data);
	});
});

function post_request(URL,body){
	fetch(URL,{
		method: "post",
		body: JSON.stringify(body)
	}).then(function(response){
		return response;
	}).then(function(data){
		
	});
}

app.post('authentication/session/new', function(req,resp){
	var myAccessToken = 'https://api.themoviedb.org/3/authentication/session/new?'+
	api_key;
	var token = req.body.request_token;
	var body = '{'+
	'"request_token": "'+ token+'"';
	'}';
	var data = post_request(myAccessToken,body);
	if (data.success){
		session_id = data.session_id;
		resp.status(200).send('Success');
	} else {
		session_id='';
		resp.send(403).send('Failure');
	}
	
	//POST request
});
//DELETE session needed here <---------------
///////////////////////////////////////////////
//POST methods
app.post('/movie/rate', function(req,resp){
	var value = req.body.value;
	var id = req.body.id;
	var myAccessToken = 'https://api.themoviedb.org/3/movie/'+
	id+
	'/rating?'+
	api_key;
	if (!guest){
		myAccessToken += '&session_id='+session_id;
	} else {
		myAccessToken += '&guest_session_id='+session_id;
	}
	
	var body = '{'+
	'"value": '+value+
	'}';
	resp.send(post_request(myAccessToken,body));
});
////DELETE rating needed here <----------------
app.post('/movie/favourite', function(req,resp){
	var account_id = req.body.account_id;
	var id = req.body.id;
	var favourite = req.body.favourite;
	if (!account_id){
		account_id = '{account_id}';
	}
	var myAccessToken = 'https://api.themoviedb.org/3/account/'+
	account_id+
	'/favourite?'+
	api_key+
	'&session_id='+
	session_id;
	
	var body = '{'+
  '"media_type": "movie",'+
  '"media_id":'+id+','+
  '"favorite": '+ favorite+
	'}';
	resp.send(post_request(myAccessToken,body));
});

//Account methods
app.get('account/favourite',function(req,resp){
	var account_id = req.query.account_id;
	if (!account_id){
		account_id = '{account_id}';
	}
	getAccessToken = 'https://api.themoviedb.org/3/account/'+
	account_id+
	'/favorite/movies?'+
	api_key+
	'&session_id='+
	session_id+
	'&sort_by=created_at.asc';
	console.log('api request at: '+getAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});

app.get('account/rated',function(req,resp){
	var account_id = req.query.account_id;
	if (!account_id){
		account_id = '{account_id}';
	}
	getAccessToken = 'https://api.themoviedb.org/3/account/'+
	account_id+
	'/rated/movies?'+
	api_key+
	'&session_id='+
	session_id+
	'&sort_by=created_at.asc';
	console.log('api request at: '+getAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			return resp.send(err);
		}
		resp.send(data);
	});
});


module.exports = app;
