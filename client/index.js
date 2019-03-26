
//example fetch 
document.addEventListener("DOMContentLoaded", function(){
	
	var search = document.getElementById('search');
	// navbar 
	var trending = document.getElementById('trending');
	var actors = document.getElementById('actors');
	var genres = document.getElementById('genres');
	var discover = document.getElementById('discover');
	var top_rated = document.getElementById('top_rated');
	var popular = document.getElementById('popular');
	var latest = document.getElementById('latest');
	var now_playing = document.getElementById('now_playing');
	var upcoming = document.getElementById('upcoming');
	//
	var header = document.getElementById('header');
	var number = document.getElementById('number');
	var content = document.getElementById('content');
	var queryBox = document.getElementById('query');
	
	var previous = document.getElementById('previous');
	var next = document.getElementById('next');
	
	var searchStr = '/movie?movie=';
	
	trending.addEventListener('click', async function(event){
		resetAll();
		trending.className += ' w3-white';
		header.innerHTML = 'Trending'
		closeAll();
		console.log('DOM updated...')
		searchStr = '/movie?movie='
		try{
			let response = await fetch('http://127.0.0.1:8090/trending');
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	actors.addEventListener('click', async function(event){
		resetAll();
		actors.className += ' w3-white';
		header.innerHTML = 'Actors'
		closeAll();
		console.log('DOM updated...')
		searchStr = '/person?person='
		try{
			let response = await fetch('http://127.0.0.1:8090/person/popular');
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	genres.addEventListener('click', async function(event){
		resetAll();
		genres.className += ' w3-white';
		header.innerHTML = 'Genres'
		closeAll();
		var x = document.getElementById("genreAcc");
		if (x.innerHTML == ''){
			try{
				let response = await fetch('http://127.0.0.1:8090/genres');
				let body = await response.text();
				console.log('api fetch success...');
				data = JSON.parse(body);
				console.log(data);
				genresDict = data;
				x.innerHTML = '';
				for (i in genresDict.genres){
					x.innerHTML += '<a id = "'+genresDict.genres[i].id+'"class="w3-bar-item w3-button">'+genresDict.genres[i].name+'</a>';
				}
				var children = document.getElementById("genreAcc").children;
				console.log(children);
				for (var i = 0; i < children.length; i++){
					children[i].addEventListener('click',async function(event){
						resetGenre();
						target = event.target;
						searchStr = '/movie?movie='
						target.className += ' w3-light-grey';
						target.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>'+target.innerHTML;
						try{
							let response = await fetch('http://127.0.0.1:8090/discover/genre?genre='+String(target.id));
							let body = await response.text();
							console.log('api fetch success...');
							data = JSON.parse(body);
							console.log(data)
							display_query(data);
						} catch(e) {
							alert(e);
						}
					});
				}
			} catch(e) {
				alert(e);
			}
		}
		genreAccFunc();
	});
	
	function resetGenre(){
		var x = document.getElementById("genreAcc");
		var children = document.getElementById("genreAcc").children;
		for (var i = 0; i < children.length; i++){
			children[i].classList.remove('w3-light-grey');
			children[i].innerHTML = children[i].innerHTML.replace('<i class="fa fa-caret-right w3-margin-right"></i>','');
		}
	}
	
	discover.addEventListener('click', function(){
		resetAll();
		discover.className += ' w3-white';
		header.innerHTML = 'Discover'
		closeAll();
		disAccFunc();
	});
	
	function resetAll(){
		trending.classList.remove('w3-white');
		actors.classList.remove('w3-white');
		genres.classList.remove('w3-white');
		discover.classList.remove('w3-white');
		resetDis();
		genres.innerHTML = 'Genres <i class="fa fa-caret-right"></i>'
		discover.innerHTML = 'Discover <i class="fa fa-caret-right"></i>'
	}
	
	function closeAll(){
		var x = document.getElementById("genreAcc");
		if (genres.className.indexOf("w3-white") == -1) {
			x.className = x.className.replace(" w3-show", "");
		}
		
		var y = document.getElementById("disAcc");
		if (discover.className.indexOf("w3-white") == -1) {
			y.className = y.className.replace(" w3-show", "");
		}
	}
	
	function genreAccFunc() {
	  var x = document.getElementById("genreAcc");
	  if (x.className.indexOf("w3-show") == -1) {
		genres.innerHTML = 'Genres <i class="fa fa-caret-down"></i>'
		x.className += " w3-show";
	  } else {
		x.className = x.className.replace(" w3-show", "");
		}
	}
	
	function disAccFunc() {
	  var x = document.getElementById("disAcc");
	  if (x.className.indexOf("w3-show") == -1) {
		discover.innerHTML = 'Discover <i class="fa fa-caret-down"></i>'
		x.className += " w3-show";
	  } else {
		x.className = x.className.replace(" w3-show", "");
		}
	}
	
	/*
	var children = document.getElementById("disAcc").children;

	for (var i = 0; i < children.length; i++){
		children[i].addEventListener('click',async function(event){
			resetDis();
			var target = event.target;
			var action = target.innerHTML;
			target.className += ' w3-light-grey';
			target.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>'+target.innerHTML;
			console.log('DOM updated...')
			searchStr = '/movie?movie='
			try{
				let response = await fetch('http://127.0.0.1:8090/discover/'+action);
				let body = await response.text();
				console.log('api fetch success...');
				data = JSON.parse(body);
				display_query(data);
			} catch(e) {
				alert(e);
				}
			});
	}*/
	
	top_rated.addEventListener('click', async function(event){
		resetDis();
		top_rated.className += ' w3-light-grey';
		top_rated.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>Top Rated';
		console.log('DOM updated...')
		searchStr = '/movie?movie='
		try{
			let response = await fetch('http://127.0.0.1:8090/discover/top_rated');
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	popular.addEventListener('click', async function(event){
		resetDis();
		popular.className += ' w3-light-grey';
		popular.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>Popular';
		console.log('DOM updated...')
		searchStr = '/movie?movie='
		try{
			let response = await fetch('http://127.0.0.1:8090/discover/popular');
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	
	latest.addEventListener('click', async function(event){
		resetDis();
		latest.className += ' w3-light-grey';
		latest.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>Latest';
		console.log('DOM updated...')
		searchStr = '/movie?movie='
		try{
			let response = await fetch('http://127.0.0.1:8090/discover/latest');
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	
	now_playing.addEventListener('click', async function(event){
		resetDis();
		now_playing.className += ' w3-light-grey';
		now_playing.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>Now Playing';
		console.log('DOM updated...')
		searchStr = '/movie?movie='
		try{
			let response = await fetch('http://127.0.0.1:8090/discover/now_playing');
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	
	upcoming.addEventListener('click', async function(event){
		resetDis();
		upcoming.className += ' w3-light-grey';
		upcoming.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>Upcoming';
		console.log('DOM updated...')
		searchStr = '/movie?movie='
		try{
			let response = await fetch('http://127.0.0.1:8090/discover/upcoming');
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	
	function resetDis(){
		var children = document.getElementById("disAcc").children;
		for (var i = 0; i < children.length; i++){
			children[i].classList.remove('w3-light-grey');
			children[i].innerHTML = children[i].innerHTML.replace('<i class="fa fa-caret-right w3-margin-right"></i>','');
		}
	}
	

	
	search.addEventListener('click', async function(event){
		var query = queryBox.value;
		header.innerHTML = 'Search Results...';
		
		try{
			let response = await fetch('http://127.0.0.1:8090/search'+searchStr+query);
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	next.addEventListener('click',async function(event){
		try{
			let response = await fetch('http://127.0.0.1:8090/page?next=1');
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			display_query(data);
			topF();
		} catch(e) {
			alert(e);
		}
	});
	
	previous.addEventListener('click',async function(event){
		try{
			let response = await fetch('http://127.0.0.1:8090/page?next=0');
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			display_query(data);
			topF();
		} catch(e) {
			alert(e);
		}
	});
	
	function topF() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}
	
	async function authentication(event){
		try{
			let response = await fetch('http://127.0.0.1:8090/authentication');
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
			token = data.request_token;
		} catch(e) {
			alert(e);
		}
	}
	
	function display_query(data){
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
	
	function addGrid(obj){
		if (obj.title){ //film
			var poster_path;
			if (obj.poster_path){
				poster_path = obj.poster_path;
			} else {
				poster_path =''
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
			'<div class="w3-display-container">'+
			  '<img src=https://image.tmdb.org/t/p/w500'+poster_path+' style="width:100%">'+
			  tag+
			  '<div class="w3-display-middle w3-display-hover">'+
				'<button class="w3-button w3-black" onclick="'+onclick+'" id="'+obj.id+'">View</button>'+
			  '</div>'+
			'</div>'+
			'<p>'+title+'<br><b>'+obj.release_date+'</b></p>'+
		  '</div>');
		} else { //actor
			var onclick="display_person(event)";
			content.innerHTML += (
			'<div class="w3-col l3 s6">'+
			'<div class="w3-container">'+
			'<div class="w3-display-container">'+
			  '<img src=https://image.tmdb.org/t/p/w500'+obj.profile_path+' style="width:100%">'+
			  '<div class="w3-display-middle w3-display-hover">'+
				'<button class="w3-button w3-black" onclick="'+onclick+'" id="'+obj.id+'">View</button>'+
			  '</div>'+
			'</div>'+
			'<p>'+obj.name+'<br><b>Known for '+obj.known_for[0].title+'</b></p>'+
		  '</div>');
			console.log('Actor added to grid: '+obj.name);
		}
	}
	
	trending.click();
});