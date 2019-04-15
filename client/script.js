

async function display_movie(event){
	document.getElementById('person_display').style.display='none'
	var target = event.target;
	var id = target.id;
	movie_id = id;
	console.log(id);
	var data;
	try{
		let response = await fetch('http://127.0.0.1:8090/details/movie?id='+id);
		let body = await response.text();
		console.log('api fetch success...');
		data = JSON.parse(body);
		console.log(data)
	} catch(e) {
		alert(e);
	}

	if (data){
		document.getElementById('title').innerHTML=data.title;
		document.getElementById('tagline').innerHTML=data.tagline;
		if (data.backdrop_path){
			document.getElementById('backdrop').src='https://image.tmdb.org/t/p/original'+data.backdrop_path;
		}
		var languages = '';
		for (i in data.spoken_languages){
			languages += data.spoken_languages[i].iso_639_1+' ';
		}
		document.getElementById('caption').innerHTML='<b>'+data.release_date+' | '+ 
			languages+ ' | '+data.runtime+ 'mins | '+data.vote_average+' </b><i class="fa fa-star checked"></i>';
			//', '+data.vote_count+' votes. <br> Homepage: '
			////////////////////////////////////	
		var rate = document.getElementById('rate');
		rate.innerHTML = '<i class="fa fa-star checked"></i> Rate'; //or otherwise if show is rated..
		rate.className = 'w3-button w3-black w3-right';
		setRated(id);
		var favourite = document.getElementById('favourite');
		favourite.innerHTML = '<i class="fa fa-thumbs-up"></i> Mark as Favourite'; // or otherwise if show is favourite..
		favourite.className = 'w3-button w3-black w3-right';
		setFavourite(id);
		document.getElementById('desc').innerHTML=data.overview;
		var path;
		path = data.poster_path;
		if (path){
				path = 'https://image.tmdb.org/t/p/w500'+path;
			} else {
				path = '/img/film-poster-placeholder.png';
			}
		document.getElementById('poster').src=path;
		document.getElementById('info').innerHTML='<b>Info:</b><br>Budget: '+data.budget+'$ <br> Revenue: '+ data.revenue+
		'$ <br> Popularity: '+ data.popularity+' <br><i class="fa fa-globe fa-fw w3-margin-right w3-text-white"></i><a href="'
		+data.homepage+'">'+data.homepage+'</a> '
		//<br> Budget: '+data.budget+'$ <br> Revenue: '+ data.revenue+'$ <br> Popularity: '+ data.popularity+
		var genres='<b>Genres:</b><br>';
		for (i in data.genres){
			var onclick = "document.getElementById('movie_display').style.display='none';document.getElementById('"+data.genres[i].id+"').click();open_genres();"
			genres += '<button class="w3-button w3-black" onclick="'+onclick+'">'+data.genres[i].name+'</button><br>';
		}
		document.getElementById('movie_genres').innerHTML=genres;
		var companies='<b>Companies:</b><br>';
		for (i in data.production_companies){
			companies += data.production_companies[i].name+ ' '+data.production_companies[i].origin_country+'<br>';
		}
		document.getElementById('companies').innerHTML=companies;
		var similar_movies = document.getElementById('similar_movies');
		similar_movies.innerHTML = '<button class="w3-button w3-black" style="margin-left:24px;margin-bottom:24px" onclick=similar_movies(event) id="'
		+data.id+'">Similar films...</button>';
		document.getElementById('more_cast').innerHTML = '<button class="w3-button w3-black" style="margin-left:24px" onclick=more_cast(event) id="'+data.id+'" >more...</button>';
		document.getElementById('more_crew').innerHTML = '<button class="w3-button w3-black" style="margin-left:24px" onclick=more_crew(event) id="'+data.id+'" >more...</button>';
	}
	data = null;
	try{
		let response = await fetch('http://127.0.0.1:8090/details/movie/credits?id='+id);
		let body = await response.text();
		console.log('api fetch success...');
		data = JSON.parse(body);
		console.log(data)
	} catch(e) {
		alert(e);
	}
		
	if (data){
		var container = document.getElementById('cast_container');
		var onclick='display_person(event)';
		var role;
		var name;
		var path;
		container.innerHTML='';
		for (i=0;i<8 && i < data.cast.length;i++){
			role = data.cast[i].character;
			name = data.cast[i].name;
			path = data.cast[i].profile_path;
			if (name.length > 21){
				name = name.substring(0,18)+'...';
			}
			if (role.length > 21){
				role = role.substring(0,18)+'...';
			}
			if (path){
				path = 'https://image.tmdb.org/t/p/w500'+path;
			} else {
				path = '/img/film-poster-placeholder.png';
			}
			container.innerHTML +='<div class="w3-col l3 s6">'+
			  '<div class="w3-container">'+
			  '<div class="w3-display-container" style="display: block;width: 100%;height: auto;position: relative;overflow: hidden;padding: 150% 0 0 0;">'+
			  '<img src="'+path+'" style="display: block;max-width: 100%;max-height: 100%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;">'+
			  '<div class="w3-display-middle w3-display-hover">'+
				'<button class="w3-button w3-black" onclick="'+onclick+'" id="'+data.cast[i].id+'">View</button>'+
			  '</div>'+
				'</div>'+
				'<p>'+role+'<br><b>'+name+'</b></p>'+
			  '</div>'+
			'</div>';
		}
		var container = document.getElementById('crew_container');
		container.innerHTML='';
		for (i=0;i<4 && i < data.crew.length;i++){
			role = data.crew[i].job;
			name = data.crew[i].name;
			path = data.crew[i].profile_path;
			if (name.length > 21){
				name = name.substring(0,18)+'...';
			}
			if (role.length > 21){
				role = role.substring(0,18)+'...';
			}
			if (path){
				path = 'https://image.tmdb.org/t/p/w500'+path;
			} else {
				path = '/img/film-poster-placeholder.png';
			}
			container.innerHTML +='<div class="w3-col l3 s6">'+
			  '<div class="w3-container">'+
			  '<div class="w3-display-container" style="display: block;width: 100%;height: auto;position: relative;overflow: hidden;padding: 150% 0 0 0;">'+
			  '<img src="'+path+'" style="display: block;max-width: 100%;max-height: 100%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;">'+
			  '<div class="w3-display-middle w3-display-hover">'+
				'<button class="w3-button w3-black" onclick="'+onclick+'" id="'+data.crew[i].id+'">View</button>'+
			  '</div>'+
			  '</div>'+
			  '<p>'+data.crew[i].job+'<br><b>'+data.crew[i].name+'</b></p>'+
			  '</div>'+
			'</div>';
		}
		
	}
	//show movie
	document.getElementById('movie_display').style.display='block'
	document.getElementById('movie_display').scrollTop=0;
		
		////////////////////////////////////////////////
}

async function setRated(id){
	var pages=0;
	var rating;
	try{
		let response = await fetch('http://127.0.0.1:8090/account/rated');
		if(!response.ok){
		  console.log('403 forbidden error: no active session');
		  return
		}
		let body = await response.text();
		console.log('api fetch success...');
		data = JSON.parse(body);
		pages = data.total_pages;
	} catch(e) {
		console.log(e);
		return
	}
	for (i in data.results){
		if (id == data.results[i].id){
			rating = data.results[i].rating;
			break;
		}
	}
	
	for (i=2;i<pages;i++){
		if (rating){break;}
		try{
			let response = await fetch('http://127.0.0.1:8090/page?next=1');
			if(!response.ok){
				console.log('404 not found error: no more pages');
				return
			}
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
		} catch(e) {
			console.log(e);
			return
		}
		for (i in data.results){
			if (rating){break;}
			if (id == data.results[i].id){
				rating=data.results[i].rating;
				break;
			}
		}
		
	}
	var rate = document.getElementById('rate');
	if (rating) {
		rate.className = rate.className.replace('w3-black','w3-yellow');
		rate.innerHTML = '<i class="fa fa-star checked"></i> <b> '+String(rating)+'</b>';
	}
}

async function setFavourite(id){
	var pages=0;
	var data;
	var isFavourite= false;
	try{
		let response = await fetch('http://127.0.0.1:8090/account/favourite');
		if(!response.ok){
		  console.log('403 forbidden error: no active session');
		  return
		} else {
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			pages = data.total_pages;
		}
	} catch(e) {
		console.log(e);
		return
	}
	for (i in data.results){
		if (id == data.results[i].id){
			isFavourite= true
			break;
		}
	}
	
	for (i=2;i<pages;i++){
		if (isFavourite){break;}
		try{
			let response = await fetch('http://127.0.0.1:8090/page?next=1');
			if(!response.ok){
				console.log('404 not found error: no more pages');
				return
			} else {
				let body = await response.text();
				console.log('api fetch success...');
				data = JSON.parse(body);
			}
		} catch(e) {
			console.log(e);
			return
		}
		for (i in data.results){
			if (id == data.results[i].id){
				isFavourite= true
				break;
			}
		}
	}
	
	var favourite = document.getElementById('favourite');
	if (isFavourite){
		favourite.innerHTML = '<i class="fa fa-thumbs-up"></i> Favourite';
		favourite.className = 'w3-button w3-red w3-right'; 
	}
}
 
function open_genres(){
	var x = document.getElementById("genreAcc");
	var genres = document.getElementById('genres');
	  if (x.className.indexOf("w3-show") == -1) {
		genres.innerHTML = 'Genres <i class="fa fa-caret-down"></i>';
		x.className += " w3-show";
	}
}
async function similar_movies(event){
		target = event.target;
		var id = target.id;
		console.log(id);
		searchStr = '/movie?movie=';
		document.getElementById('movie_display').style.display='none';
		document.getElementById('find').click();
		document.getElementById('header').innerHTML = 'Find - '+ document.getElementById('title').innerHTML+' - Similar films';
		topF();
		try{
			let response = await fetch('http://127.0.0.1:8090/movie/similar?id='+id);
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			console.log(data)
			display_query(data);
		} catch(e) {
			alert(e);
		}
}

async function more_film(event){
		document.getElementById('person_display').style.display='none';
		target = event.target;
		var id = target.id;
		searchStr = '/movie?movie=';
		document.getElementById('find').click();
		document.getElementById('header').innerHTML = 'Find - '+ document.getElementById('name').innerHTML+' - Films';
		topF();
		try{
			let response = await fetch('http://127.0.0.1:8090/person/find/movie?id='+id);
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			console.log(data)
			display_query(data);
		} catch(e) {
			alert(e);
		}
	};
	
	async function more_cast(event){
		document.getElementById('movie_display').style.display='none';
		target = event.target;
		var id = target.id;
		searchStr = '/person?person=';
		document.getElementById('find').click();
		document.getElementById('header').innerHTML = 'Find - '+ document.getElementById('title').innerHTML+' - Cast';
		topF();
		try{
			let response = await fetch('http://127.0.0.1:8090/details/movie/credits?id='+id);
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			console.log(data);
			display_more(data,true);
		} catch(e) {
			alert(e);
		}
	}
	
	async function more_crew(event){
		document.getElementById('movie_display').style.display='none';
		target = event.target;
		var id = target.id;
		searchStr = '/person?person=';
		document.getElementById('find').click();
		document.getElementById('header').innerHTML = 'Find - '+ document.getElementById('title').innerHTML+' - Crew';
		topF();
		try{
			let response = await fetch('http://127.0.0.1:8090/details/movie/credits?id='+id);
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			console.log(data);
			display_more(data,false);
		} catch(e) {
			alert(e);
		}
	}
	
function display_more(data,cast){
	var number = document.getElementById('number');
	var content = document.getElementById('content');
	
		console.log(data);
		content.innerHTML = '';
		var list;
		if (cast){
			list = data.cast;
			number.innerHTML = data.cast.length + ' items...'
		} else {
			list= data.crew;
			number.innerHTML = data.crew.length + ' items...'
		}
		for (i in list){
			obj = list[i];
			var onclick="display_person(event)";
			var role;
			var path = obj.profile_path;
			if (cast){
				role = 'Plays '+ obj.character;
			} else {
				role = obj.job
			}
			
			var name = obj.name;
			if (role){
				if (role.length > 31){
				role = role.substring(0,28)+'...'
				}
			}
			if (name){
				if (name.length > 21){
				name = name.substring(0,18)+'...'
				}
			}
			if (path){
				path = 'https://image.tmdb.org/t/p/w500'+path;
			} else {
				path = '/img/film-poster-placeholder.png';
			}
			
			content.innerHTML += (
			'<div class="w3-col l3 s6">'+
			'<div class="w3-container">'+
			'<div class="w3-display-container" style="display: block;width: 100%;height: auto;position: relative;overflow: hidden;padding: 150% 0 0 0;">'+
			  '<img src="'+path+'" style="display: block;max-width: 100%;max-height: 100%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;">'+
			  '<div class="w3-display-middle w3-display-hover">'+
				'<button class="w3-button w3-black" onclick="'+onclick+'" id="'+obj.id+'">View</button>'+
			  '</div>'+
			'</div>'+
			'<p>'+name+'<br><b>'+role+'</b></p>'+
		  '</div>');
			console.log('Actor added to grid: '+obj.name);
			
			console.log('Object added to grid...');
		};
		console.log('data added...');
	}

async function display_person(event){
	document.getElementById('movie_display').style.display='none';
	target = event.target;
	var id = target.id
	console.log(id);
	var data;
	try{
		let response = await fetch('http://127.0.0.1:8090/details/person?id='+id);
		let body = await response.text();
		console.log('api fetch success...');
		data = JSON.parse(body);
		console.log(data)
	} catch(e) {
		alert(e);
	}
	document.getElementById('person_display').style.display='block'
	document.getElementById('person_display').scrollTop=0;
	if (data){
		var path = data.profile_path;
		if (path){
			path = 'https://image.tmdb.org/t/p/w500'+path;
		} else {
			path ='/img/film-poster-placeholder.png';
		}
		document.getElementById('name').innerHTML=data.name;
		document.getElementById('portrait').src=path;
		document.getElementById('person_job').innerHTML='<h4><b>'+data.known_for_department + '</b></h4> Popularity: '+data.popularity;
		var death ='';
		if(data.deathday){
			death = '<br>Died: '+data.deathday;
		}
		document.getElementById('about').innerHTML='Born: '+data.birthday+', '+data.place_of_birth+death+'.<br>'+data.biography;
		document.getElementById('more_film').innerHTML='<button class="w3-button w3-black" style="margin-left:24px" onclick="more_film(event)" id="'+data.id+'" >more...</button>'
	}
	data = null;
	try{
		let response = await fetch('http://127.0.0.1:8090/details/person/movie/credits?id='+id);
		let body = await response.text();
		console.log('api fetch success...');
		data = JSON.parse(body);
		console.log(data);
	} catch(e) {
		alert(e);
	}
	
	if (data){
		var container = document.getElementById('film_container');
		container.innerHTML='';
		var onclick = 'display_movie(event)';
		for (i=0;i<8;i++){
			var path;
			var movie_id;
			var role;
			var title;
			if (data.cast.length > data.crew.length){
				path = data.cast[i].poster_path;
				movie_id = data.cast[i].id;
				role = data.cast[i].character;
				title = data.cast[i].title;
			} else {
				path = data.crew[i].poster_path;
				movie_id = data.crew[i].id;
				role = data.crew[i].job;
				title = data.crew[i].title;
			}
			if (title.length > 21){
				title = title.substring(0,18)+'...';
			}
			if (role.length > 21){
				role = role.substring(0,18)+'...';
			}
			if (path){
				path = 'https://image.tmdb.org/t/p/w500'+path;
			} else {
				path = '/img/film-poster-placeholder.png';
			}
			container.innerHTML +='<div class="w3-col l3 s6">'+
			  '<div class="w3-container">'+
			  '<p>'+role+', in<br><b>'+title+'</b></p>'+
			  '<div class="w3-display-container" style="display: block;width: 100%;height: auto;position: relative;overflow: hidden;padding: 150% 0 0 0;">'+
			  '<img src='+path+' style="display: block;max-width: 100%;max-height: 100%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;">'+
			  '<div class="w3-display-middle w3-display-hover">'+
				'<button class="w3-button w3-black" onclick="'+onclick+'" id="'+movie_id+'">View</button>'+
			  '</div>'+
			  '</div>'+
			'</div>'+
			'</div>';
		}
	}
}



async function spotlight(event){
	var data;
	var film;
	try{
		let response = await fetch('http://127.0.0.1:8090/discover/popular');
		let body = await response.text();
		console.log('api fetch success...');
		data = JSON.parse(body);
		console.log(data)
	} catch(e) {
		alert(e);
	}
	if (data){
		film = data.results[0];
	}
	
	try{
		let response = await fetch('http://127.0.0.1:8090/details/movie?id='+film.id);
		let body = await response.text();
		console.log('api fetch success...');
		data = JSON.parse(body);
		console.log(data)
	} catch(e) {
		alert(e);
	}
	
	if (data){
		document.getElementById('spotlight1').innerHTML=data.title;
		document.getElementById('spotlight2').innerHTML=data.title;
		document.getElementById('spotlightimg').src ='https://image.tmdb.org/t/p/original'+data.backdrop_path;
		document.getElementById('spotlightpara').innerHTML= '<a id="'+data.id+'" onclick="display_movie(event)" class="w3-button w3-black w3-padding-large w3-large">VIEW NOW</a>';
	}
	
}
function display_query(data){
	var number = document.getElementById('number');
	var content = document.getElementById('content');
		results = data.results;
		console.log(data);
		content.innerHTML = '';
		for (i in results){
			addGrid(results[i]);
			console.log('Object added to grid...');
		};
		number.innerHTML = data.total_results + ' items, '+data.total_pages+' pages... page '+data.page;
		console.log('data added...');
	}
	
async function rate_movie(event){
		var rating = parseInt(event.target.id.substring(4));
		var id = movie_id;
		
		console.log('Rating: '+ rating);
		try{
			let response = await fetch('http://127.0.01:8090/movie/rate',
									   {
										 method: "POST",
										 headers: {
										   "Content-Type": "application/x-www-form-urlencoded"
										 },
										 body: "value=" + rating+'&id='+id
									   });
			if(!response.ok){
			  alert('403 forbidden error: no active session');
			} else {
				var rate = document.getElementById('rate');
				rate.className = rate.className.replace('w3-black','w3-yellow');
				rate.innerHTML = '<i class="fa fa-star checked"></i> <b> '+String(rating)+'</b>';
			}
		} catch (e) {
			alert (e);
		}
	}

async function delete_rating(event){
		var id = movie_id;
		//delete rating
		try{
			let response = await fetch('http://127.0.01:8090/movie/rate/delete',
									   {
										 method: "DELETE",
										 headers: {
										   "Content-Type": "application/x-www-form-urlencoded"
										 },
										 body: 'id='+id
									   });
			if(!response.ok){
			  alert('403 forbidden error: no active session');
			} else {
				var rate = document.getElementById('rate');
				rate.innerHTML = '<i class="fa fa-star checked"></i> Rate'; //or otherwise if show is rated..
				rate.className = 'w3-button w3-black w3-right';
			}
		} catch (e) {
			alert (e);
		}
	}

function hover_rate(event){
	var id = event.target.id;
	var x = parseInt(id.substring(4));
	console.log(x);
	document.getElementById('rating').innerHTML='<b>'+String(x)+'</b>';
	for (i=1;i<11;i++){
		var star = document.getElementById('rate'+String(i));
		star.className='w3-button w3-black w3-small fa fa-star checked';
	}
	for (i=10;i>x;i=i-1){
		var star = document.getElementById('rate'+String(i));
		star.className='w3-button w3-black w3-small fa fa-star-o';
	}
}
	
	function addGrid(obj){
			var content = document.getElementById('content');
		if (obj.title){ //film
			var poster_path;
			if (obj.poster_path){
				poster_path = 'https://image.tmdb.org/t/p/w500'+obj.poster_path;
			} else {
				poster_path ='/img/film-poster-placeholder.png';
			}
			var d = new Date();
			var r = new Date(obj.release_date);
			var tag = '';
			var diff = (d-r)/86400000;
			if (diff < 0){
				tag = '<span class="w3-tag w3-display-topleft">Coming Soon</span>';
			} else if (diff < 63){
				tag = '<span class="w3-tag w3-display-topleft">New</span>';
			}
			var title;
			if (obj.title.length > 21){
				title = obj.title.substring(0,18)+'...';
			} else {
				title = obj.title;
			}
			var onclick="display_movie(event)";
			content.innerHTML += (
			'<div class="w3-col l3 s6">'+
			'<div class="w3-container">'+
			'<div class="w3-display-container" style="display: block;width: 100%;height: auto;position: relative;overflow: hidden;padding: 150% 0 0 0;">'+
			  '<img src="'+poster_path+'" style="display: block;max-width: 100%;max-height: 100%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;">'+
			  tag+
			  '<div class="w3-display-middle w3-display-hover">'+
				'<button class="w3-button w3-black" onclick="'+onclick+'" id="'+obj.id+'">View</button>'+
			  '</div>'+
			'</div>'+
			'<p>'+title+'<br><b>'+obj.release_date+'</b></p>'+
		  '</div>');
		} else { //actor
			var onclick="display_person(event)";
			var title = 'Known for '+ obj.known_for[0].title;
			var name = obj.name;
			var profile_path;
			if (obj.profile_path){
				profile_path = 'https://image.tmdb.org/t/p/w500'+obj.profile_path;
			} else {
				profile_path ='/img/film-poster-placeholder.png';
			}
			if (title.length > 31){
				title = title.substring(0,28)+'...'
			}
			if (name.length > 21){
				name = name.substring(0,18)+'...'
			}
			content.innerHTML += (
			'<div class="w3-col l3 s6">'+
			'<div class="w3-container">'+
			'<div class="w3-display-container" style="display: block;width: 100%;height: auto;position: relative;overflow: hidden;padding: 150% 0 0 0;">'+
			  '<img src="'+profile_path+'" style="display: block;max-width: 100%;max-height: 100%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;">'+
			  '<div class="w3-display-middle w3-display-hover">'+
				'<button class="w3-button w3-black" onclick="'+onclick+'" id="'+obj.id+'">View</button>'+
			  '</div>'+
			'</div>'+
			'<p>'+name+'<br><b>'+title+'</b></p>'+
		  '</div>');
			console.log('Actor added to grid: '+obj.name);
		}
	}