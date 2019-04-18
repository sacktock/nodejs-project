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
//api key for the api.moviedb.org
const api_key = 'api_key=f5a15381e863efaf6551e766d6b1088f'
var getAccessToken;
var page;
var session_id;
const guest = false;
/* eslint-disable no-console */
/////////////////////////////////
// function to make a GET api request with a callback 
function api_request(getAccessToken,callback){
	request.get(getAccessToken, function (error, response, body) {
		if (!error && response.statusCode == 200) {
            var result = JSON.stringify(JSON.parse(body));          
            return callback(false,result);
        } else {            
            return callback(error,null);
        }
	});
		
}

// GET method to search api for a film
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
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data)
	});
});

// Get method to search api for a person
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
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data)
	});
});
/////////////////////////////////////////////////////////////
//GET method for finding next page of data
app.get('/page', function(req, resp){
	var next = req.query.next;
	if (next == 1){
		console.log('accessing page:' + String(page));
		page +=1;
	} else {
		console.log('accessing page:' + String(page));
		page -=1;
	}
	getAccessToken += '&page='+String(page);
	
	console.log('api request at: '+getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		if (data){
			if(JSON.parse(data).page < 1){
				page = 1;
				console.log('404 Not Found');
				return resp.status(404).send('Not Found');
			}
			if (JSON.parse(data).page >JSON.parse(data).total_pages){
				page = JSON.parse(data).total_pages;
				console.log('404 Not Found');
				return resp.status(404).send('Not Found');
			}
			console.log('Success');
			resp.send(data);
		} else {
			page = 1;
			console.log('404 Not Found');
			resp.status(404).send('Not Found');
		}
	});
});
///////////////////////////////////////////////
//GET method for finding all details of a specific film by id
app.get('/details/movie', function(req,resp){
	var query = req.query.id;
	var myAccessToken = 'https://api.themoviedb.org/3/movie/'+
	query +
	'?'+
	api_key;
	console.log('api request at: '+myAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data)
	});
});

//GET method for finsing all the cast a and crew of a specific film by id
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
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data)
	});
});

//GET method for finding the specific details of a person by id
app.get('/details/person', function(req,resp){
	var query = req.query.id;
	var myAccessToken = 'https://api.themoviedb.org/3/person/'+
	query +
	'?'+
	api_key;
	console.log('api request at: '+myAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data)
	});
});

//GET method for finding the films a specific person is invloved in and their invlovement (character/cast member) by id
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
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data)
	});
});
////////////////////////////////////////////////////////////
//GET method for finding trending movies defined by the api
app.get('/trending', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/trending/movie/day?'+
	api_key;
	page = 1;
	console.log('api request at: '+getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data);
	});
});

//GET method for retreiving the list of genres defined by the api
app.get('/genres', function(req,resp){
	var myAccessToken = 'https://api.themoviedb.org/3/genre/movie/list?'+
	api_key;
	console.log('api request at: ' +myAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data);
	});
});

//GET method for finding films of a specific genre defined by the api
app.get('/discover/genre', function(req,resp){
	var id = req.query.genre;
	getAccessToken = 'https://api.themoviedb.org/3/discover/movie?'+
	api_key+
	'&sort_by=popularity.desc'+
	'&with_genres='+String(id);
	console.log('api request at: '+ getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data);
	});
});

//GET method for finding details of films a specific person is involed in by id
app.get('/person/find/movie', function(req,resp){
	var id = req.query.id;
	getAccessToken = 'https://api.themoviedb.org/3/discover/movie?'+
	api_key+
	'&sort_by=popularity.desc'+
	'&with_people='+id;
	console.log('api request at: ' +getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data);
	});
});

//GET method for finding films similar to a specific film defined by the api
app.get('/movie/similar', function(req,resp){
	var id = req.query.id;
	getAccessToken = 'https://api.themoviedb.org/3/movie/'+
	id+
	'/similar?'+
	api_key;
	console.log('api request at: ' +getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data);
	});
});

//GET method to find top rated films defined by the api 
app.get('/discover/top_rated', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/movie/top_rated?'+
	api_key;
	console.log('api request at: '+ getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data);
	});
});

//GET method to find popular films defined by the api
app.get('/discover/popular', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/movie/popular?'+
	api_key;
	console.log('api request at: '+ getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data);
	});
});

//GET method to find films playing in cinemas
app.get('/discover/now_playing', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/movie/now_playing?'+
	api_key;
	console.log('api request at: '+ getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data);
	});
});

//GET method to find upcoming films
app.get('/discover/upcoming', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/movie/upcoming?'+
	api_key;
	console.log('api request at: '+ getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data);
	});
});

//GET method to find popular people defined by the api
app.get('/person/popular', function(req,resp){
	getAccessToken = 'https://api.themoviedb.org/3/person/popular?'+
	api_key;
	console.log('api request at: ' +getAccessToken);
	api_request(getAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data);
	});
});


//Authentication methods
//GET method that requests a new session token
app.get('/authentication/token/new', function(req,resp){
	var myAccessToken ='https://api.themoviedb.org/3/authentication/token/new?'+
	api_key;
	console.log('api request at: '+myAccessToken);
	api_request(myAccessToken, function(err,data){
		if (err) {
			console.log(err);
			return resp.send(err);
		}
		console.log('Success');
		resp.send(data);
	});
	
});

//function to make an api POST request with body and callback
function post_request(URL,body, callback){
	request.post({
		url: URL,
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		},
		body: body
		}, function(error,response,body){
			if (!error && response.statusCode == 200) {
				var result = JSON.stringify(JSON.parse(body)); 
				return callback(false,result);
			} else {     
				result = JSON.stringify(JSON.parse(body)); 			
				return callback(error,result);
			}
		});
}

//server sider GET method that calls an api POST request, requesting a new session_id using the authentication token
app.get('/authentication/session/new', function(req,resp){
	var myAccessToken = 'https://api.themoviedb.org/3/authentication/session/new?'+
	api_key;
	var token = req.query.request_token;
	var approved = req.query.approved;
	console.log('token: '+token, 'approved: '+approved);
	var body = '{"request_token": "'+token+'"}';
	console.log('api request at: '+myAccessToken);
	if (approved){
		post_request(myAccessToken,body, function(err,data){
			if (err) {
				console.log(err);
				return resp.send(err);
			}
			let x = JSON.parse(data);
			if (x.success){
				session_id = x.session_id;
				console.log('Success session created at:'+session_id);
				return resp.status(302).redirect('http://127.0.0.1:8090');
			} else {
				console.log('401 Unauthorized');
				return resp.status(401).send('401 unauthorized error: failure to create session return to http://127.0.0.1:8090')
			}
			
		});
	} else {
		console.log('401 Unauthorized');
		resp.status(401).send('401 unauthorized error: user failed to accept authentication request return to http://127.0.0.1:8090')
	}
});

//POST methods
//POST method to rate a film
app.post('/movie/rate', function(req,resp){
	console.log('session_id:' +session_id);
	if (session_id){
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
		
		var body = '{"value": '+value+'}';
		console.log('api request at: '+myAccessToken, 'body: '+body);
		post_request(myAccessToken,body, function(err,data){
			if (err){
				console.log(err);
				return resp.send(err);
			}
			console.log('Success');
			resp.send(data);
		});
	} else {
		console.log('403 Forbidden');
		resp.status(403).send('No active session');
	}
});

// function to make a DELETE api request with callback
function delete_request(URL, callback){
	request.delete(URL,
		function(error,response){
			if (!error && response.statusCode == 200) {
				return callback(false,response);
			} else {            
				return callback(error,null);
			}
		});
}

//DELETE method to delete a rating
app.delete('/movie/rate/delete', function(req,resp){
	if (session_id){
		var id = req.body.id;
		var myAccessToken = 'https://api.themoviedb.org/3/movie/'+
		id+
		'/rating?'+
		api_key+
		'&session_id='+
		session_id;
		console.log('api request at: '+myAccessToken);
		delete_request(myAccessToken, function(err,data){
			if(err){
				console.log(err);
				return resp.send(err);
			}
			console.log('Success');
			resp.send(data);
		});
	} else {
		console.log('403 Forbidden');
		resp.status(403).send('No active session');
	}
});

//POST method to mark/unmark a film as favourite
app.post('/movie/favourite', function(req,resp){
	console.log('session_id:' +session_id);
	if (session_id){
		var account_id = req.body.account_id;
		var id = req.body.id;
		var favourite = req.body.favourite;
		if (!account_id){
			account_id = '{account_id}';
		}
		var myAccessToken = 'https://api.themoviedb.org/3/account/'+
		account_id+
		'/favorite?'+
		api_key+
		'&session_id='+
		session_id;
		
		var body = '{"media_type": "movie", "media_id": '+id+', "favorite": '+favourite+'}';
		console.log('api request at: '+myAccessToken, 'body: '+ body);
		post_request(myAccessToken,body, function(err,data){
			if (err){
				console.log(err);
				return resp.send(err);
			}
			console.log('Success');
			resp.send(data);
		});
	} else {
		console.log('403 Forbidden');
		resp.status(403).send('No active session');
	}
});

//Account methods
//GET request to retreive favourite movies for a particular account/session_id
app.get('/account/favourite',function(req,resp){
	console.log('session_id:' +session_id);
	if (session_id){
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
		'&sort_by=created_at.desc';
		console.log('api request at: '+getAccessToken);
		api_request(getAccessToken, function(err,data){
			if (err) {
				console.log(err);
				return resp.send(err);
			}
			console.log('Success');
			resp.send(data);
		});
	} else {
		console.log('403 Forbidden');
		resp.status(403).send('No active session');
	}
});

//GET request to retreive rated movies for a particular account/session_id
app.get('/account/rated',function(req,resp){
	console.log('session_id:' +session_id);
	if (session_id){
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
		'&sort_by=created_at.desc';
		console.log('api request at: '+getAccessToken);
		api_request(getAccessToken, function(err,data){
			if (err) {
				console.log(err);
				return resp.send(err);
			}
			console.log('Success');
			resp.send(data);
		});
	} else {
		console.log('403 Forbidden');
		resp.status(403).send('No active session');
	}
});

app.get('/authentication/token/remote', function(req,resp){
	var request_token = req.query.request_token;
	var myAccessToken = 'https://api.themoviedb.org/3/authentication/token/validate_with_login?'+
	api_key;
	var body = '{'+
			'"username": "sacktock",'+
			'"password": "agdego44",'+
			'"request_token": "'+ request_token+'"'+
			'}'
	post_request(myAccessToken,body, function(err,data){
			if (err) {
				console.log(err);
				return resp.send(err);
			}
			let x = JSON.parse(data);
			if (x.success){
				console.log('Success token remotely validated');
				return resp.status(200).send('ok');
			} else {
				console.log('401 Unauthorized');
				return resp.status(401).send('401 unauthorized error: failure to create session return to http://127.0.0.1:8090')
			}
			
		});
});


module.exports = app;
