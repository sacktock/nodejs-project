
const request = require('supertest');
const app = require('./app');
var request_token;

function isGlass(resp){
	const jContent = JSON.parse(resp.text);
	
	if(typeof jContent != 'object'){
		throw new Error('not an object');
    }
	
	if(jContent['title'] != 'Glass'){
		throw new Error('movie should be Glass');
    }
}

function isGlassByID(resp){
	const jContent = JSON.parse(resp.text);
	
	if(typeof jContent != 'object'){
		throw new Error('not an object');
    }
	
	if(jContent['id'] != 450465){
		throw new Error('id should be consistent');
    }
}

function isSeanBean(resp){
	const jContent = JSON.parse(resp.text);
	
	if(typeof jContent != 'object'){
		throw new Error('not an object');
    }
	
	if(jContent['name'] != 'Sean Bean'){
		throw new Error('person should be "Sean Bean"');
    }
	
}

function isSeanBeanByID(resp){
	const jContent = JSON.parse(resp.text);
	
	if(typeof jContent != 'object'){
		throw new Error('not an object');
    }
	
	if(jContent['id'] != 48){
		throw new Error('id should be consistent');
    }
	
}

function hasAction(resp){
	const jContent = JSON.parse(resp.text);
	
	for (var i in jContent.results){
		if (!jContent.results[i].genre_ids.includes(28)){
			throw new Error('genre not consistent')
		}
	}
	
}
function isToken(resp){
	const jContent = JSON.parse(resp.text);
	
	if(typeof jContent != 'object'){
		throw new Error('not an object');
    }
	
	if(jContent['success'] != true){
		throw new Error('unsuccessful request');
    }
	if (!jContent['request_token']){
		throw new Error('should have received a request token')
	} else {
		request_token = jContent['request_token'];
	}
}

describe('Test movie service', () => {
	test('GET /search/movie succeeds', () => {
		return request(app)
		.get('/search/movie?movie=glass')
		.expect(200);
		//expect the movie glass
    });
	
	test('GET /search/movie returns text', () => {
		return request(app)
		.get('/search/movie?movie=glass')
		.expect('Content-type', "text/html; charset=utf-8");
		//expect the movie glass
    });
	
	
	test('GET /search/person succeeds', () => {
		return request(app)
		.get('/search/person?person=sean bean')
		.expect(200);
		//expect sean bean
    });
	
	test('GET /search/person returns text', () => {
		return request(app)
		.get('/search/person?person=sean bean')
		.expect('Content-type', "text/html; charset=utf-8");
		//expect sean bean
    });
	
	//page tests.....
	//pagination ....
	
	test('GET /details/movie succeeds', () => {
		return request(app)
		.get('/details/movie?id=450465')
		.expect(200);
		//expect the movie glass
    });
	
	test('GET /details/movie returns text', () => {
		return request(app)
		.get('/details/movie?id=450465')
		.expect('Content-type', "text/html; charset=utf-8");
		//expect the movie glass
    });
	
	test('GET /details/movie includes title', () => {
		return request(app)
		.get('/details/movie?id=450465')
		.expect(isGlass);
		//expect the movie glass
    });
	
	test('GET /details/movie/credits succeeds', () => {
		return request(app)
		.get('/details/movie/credits?id=450465')
		.expect(200);
		//expect the movie glass
    });
	
	test('GET /details/movie/credits returns text', () => {
		return request(app)
		.get('/details/movie/credits?id=450465')
		.expect('Content-type', "text/html; charset=utf-8");
		//expect the movie glass
    });
	
	test('GET /details/movie/credits returns consistent id', () => {
		return request(app)
		.get('/details/movie/credits?id=450465')
		.expect(isGlassByID);
		//expect the movie glass
    });
	
	test('GET /details/person succeeds', () => {
		return request(app)
		.get('/details/person?id=48')
		.expect(200);
		//expect sean bean
    });
	
	test('GET /details/person returns text', () => {
		return request(app)
		.get('/details/person?id=48')
		.expect('Content-type', "text/html; charset=utf-8");
		//expect sean bean
    });
	
	test('GET /details/person includes name', () => {
		return request(app)
		.get('/details/person?id=48')
		.expect(isSeanBean);
		//expect sean bean
    });
	
	test('GET /details/person/movie/credits succeeds', () => {
		return request(app)
		.get('/details/person/movie/credits?id=48')
		.expect(200);
		//expect sean bean
    });
	
	test('GET /details/person/movie/credits returns text', () => {
		return request(app)
		.get('/details/person/movie/credits?id=48')
		.expect('Content-type', "text/html; charset=utf-8");
		//expect sean bean
    });
	
	test('GET /details/person/movie/credits returns consistent id', () => {
		return request(app)
		.get('/details/person/movie/credits?id=48')
		.expect(isSeanBeanByID);
		//expect sean bean
    });
	
	test('GET /trending succeeds', () =>{
		return request(app)
		.get('/trending')
		.expect(200);
	});
	
	test('GET /trending returns text', () =>{
		return request(app)
		.get('/trending')
		.expect('Content-type', "text/html; charset=utf-8");
	});
	
	test('GET /genres succeeds', () =>{
		return request(app)
		.get('/genres')
		.expect(200);
	});
	
	test('GET /genres returns text', () =>{
		return request(app)
		.get('/genres')
		.expect('Content-type', "text/html; charset=utf-8");
	});
	
	test('GET /discover/genre succeeds', () =>{
		return request(app)
		.get('/discover/genre?genre=28')
		.expect(200);
		//expect action
	});
	
	test('GET /discover/genre returns text', () =>{
		return request(app)
		.get('/discover/genre?genre=28')
		.expect('Content-type', "text/html; charset=utf-8");
		//expect action
	});
	
	test('GET /discover/genre returns consistent genre', () =>{
		return request(app)
		.get('/discover/genre?genre=28')
		.expect(hasAction);
		//expect action
	});
	

	test('GET /person/find/movie succeeds', () => {
		return request(app)
		.get('/person/find/movie?id=48')
		.expect(200);
		//expect sean bean
    });
	
	test('GET /person/find/movie returns text', () => {
		return request(app)
		.get('/person/find/movie?id=48')
		.expect('Content-type', "text/html; charset=utf-8");
		//expect sean bean
    });
	
	test('GET /movie/similar succeeds', () =>{
		return request(app)
		.get('/movie/similar?id=450465')
		.expect(200);
	});
	
	test('GET /movie/similar returns text', () =>{
		return request(app)
		.get('/movie/similar?id=450465')
		.expect('Content-type', "text/html; charset=utf-8");
	});
	
	test('GET /discover/top_rated succeeds', () =>{
		return request(app)
		.get('/discover/top_rated')
			.expect(200);
	});
	
	test('GET /discover/top_rated returns text', () =>{
		return request(app)
		.get('/discover/top_rated')
		.expect('Content-type', "text/html; charset=utf-8");
	});
	
	test('GET /discover/popular succeeds', () =>{
		return request(app)
		.get('/discover/popular')
		.expect(200);
	});
	
	test('GET /discover/popular returns text', () =>{
		return request(app)
		.get('/discover/popular')
		.expect('Content-type', "text/html; charset=utf-8");
	});
	
	test('GET /discover/now_playing succeeds', () =>{
		return request(app)
		.get('/discover/now_playing')
		.expect(200);
	});
	
	test('GET /discover/now_playing returns text', () =>{
		return request(app)
		.get('/discover/now_playing')
		.expect('Content-type', "text/html; charset=utf-8");
	});
	
	test('GET /discover/upcoming succeeds', () =>{
		return request(app)
		.get('/discover/upcoming')
		.expect(200);
	});
	
	test('GET /discover/upcoming returns text', () =>{
		return request(app)
		.get('/discover/upcoming')
		.expect('Content-type', "text/html; charset=utf-8");
	});
	
	test('GET /person/popular succeeds', () =>{
		return request(app)
		.get('/person/popular')
		.expect(200);
	});
	
	test('GET /person/popular returns text', () =>{
		return request(app)
		.get('/person/popular')
		.expect('Content-type', "text/html; charset=utf-8");
	});
	
	
	//POST tests
	test('POST /movie/rate needs active session', () => {
        return request(app)
		.post('/movie/rate')
		.expect(403);
    });
	
	test('POST /movie/favourite needs active session', () => {
        return request(app)
		.post('/movie/favourite')
		.expect(403);
    });
	
	//DELETE tests
	test('DELETE /movie/rate/delete needs active session', () => {
        return request(app)
		.delete('/movie/rate/delete')
		.expect(403);
    });
	
	//Account GET tests
	test('GET /account/favourite needs active session', () =>{
		return request(app)
		.get('/account/favourite')
		.expect(403);
	});
	
	test('GET /account/rated needs active session', () =>{
		return request(app)
		.get('/account/rated')
		.expect(403);
	});
});

describe('Test authentication service', () => {
	//authentication tests
	test('GET /authentication/token/new succeeds', () =>{
		return request(app)
		.get('/authentication/token/new')
		.expect(200);
	});
	
	test('GET /authentication/token/new returns text', () =>{
		return request(app)
		.get('/authentication/token/new')
		.expect('Content-type', "text/html; charset=utf-8");
	});
	
	test('GET /authentication/token/new returns a token', () =>{
		return request(app)
		.get('/authentication/token/new')
		.expect(isToken);
	});
	
	test('GET /authentication/session/new fails becase token is not validated', () =>{
		var token = request_token;
		return request(app)
		.get('/authentication/session/new?request_token='+token+'&approved=true')
		.expect(401);
	});
	
	test('GET /authentication/session/new fails because of wrong token', () =>{
		var token = null;
		return request(app)
		.get('/authentication/session/new?request_token='+token+'&approved=true')
		.expect(401);
	});
	
	test('GET /authentication/session/new redirects fails because user declines 3rd party authentication', () =>{
		var token = request_token;
		return request(app)
		.get('/authentication/session/new?request_token='+token+'&denied=true')
		.expect(401);
	});
	
	test('GET /authentication/token/remote succeeds',() =>{
		var token = request_token;
		return request(app)
		.get('/authentication/token/remote?request_token='+token)
		.expect(200);
	});
	
	test('GET /authentication/session/new redirect succeeds', () =>{
		var token = request_token;
		return request(app)
		.get('/authentication/session/new?request_token='+token+'&approved=true')
		.expect(302);
	});
});

// These tests only work after a successful authentication,
// if test('GET /authentication/session/new redirect succeeds' fails then these tests will also fail
describe('Test account services',() => {
	test('POST /movie/rate succeeds', () => {
		const params = 'value=8&id=450465';
        return request(app)
		.post('/movie/rate')
		.send(params)
		.expect(200);
    });
	
	test('POST /movie/favourite succeeds', () => {
		const params = 'id=450465&favourite=true';
        return request(app)
		.post('/movie/favourite')
		.send(params)
		.expect(200);
    });
	
	test('DELETE /movie/rate/delete succeeds', () => {
		const params = 'id=450465';
        return request(app)
		.delete('/movie/rate/delete')
		.send(params)
		.expect(200);
    });
	
	test('GET /account/favourite succeeds', () =>{
		return request(app)
		.get('/account/favourite')
		.expect(200);
	});
	
	test('GET /account/favourite returns text', () =>{
		return request(app)
		.get('/account/favourite')
		.expect('Content-type', "text/html; charset=utf-8");
	});
	
	test('GET /account/rated succeeeds', () =>{
		return request(app)
		.get('/account/rated')
		.expect(200);
	});
	
	test('GET /account/rated returns text', () =>{
		return request(app)
		.get('/account/rated')
		.expect('Content-type', "text/html; charset=utf-8");
	});
});

