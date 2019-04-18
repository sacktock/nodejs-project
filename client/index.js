var searchStr = '/movie?movie=';
var movie_id;
function topF() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
document.addEventListener("DOMContentLoaded", function(){
	
	var search = document.getElementById('search');
	// navbar 
	var trending = document.getElementById('trending');
	var actors = document.getElementById('actors');
	var genres = document.getElementById('genres');
	var discover = document.getElementById('discover');
	var top_rated = document.getElementById('top_rated');
	var popular = document.getElementById('popular');
	var now_playing = document.getElementById('now_playing');
	var upcoming = document.getElementById('upcoming');
	var find = document.getElementById('find');
	//
	var header = document.getElementById('header');
	var number = document.getElementById('number');
	var content = document.getElementById('content');
	var queryBox = document.getElementById('query');
	
	var previous = document.getElementById('previous');
	var next = document.getElementById('next');
	
	var rate = document.getElementById('rate');
	var favourite = document.getElementById('favourite');
	
	var authenticate = document.getElementById('authenticate');
	
	var you = document.getElementById('you');
	var ratedBy = document.getElementById('rated');
	var favouriteY = document.getElementById('favouriteY');
	
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
			data = JSON.parse(body);
			console.log('api fetch success...');
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	actors.addEventListener('click', async function(event){
		resetAll();
		actors.className += ' w3-white';
		header.innerHTML = 'People'
		closeAll();
		console.log('DOM updated...')
		searchStr = '/person?person='
		try{
			let response = await fetch('http://127.0.0.1:8090/person/popular');
			let body = await response.text();
			data = JSON.parse(body);
			console.log('api fetch success...');
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
		genreAccFunc();
	});
	
	async function setup_genres(){
		var x = document.getElementById("genreAcc");
		if (x.innerHTML == ''){
			try{
				let response = await fetch('http://127.0.0.1:8090/genres');
				let body = await response.text();
				console.log('api fetch success...');
				data = JSON.parse(body);
				genresDict = data;
				x.innerHTML = '';
				for (i in genresDict.genres){
					x.innerHTML += '<a id = "'+genresDict.genres[i].id+'"class="w3-bar-item w3-button">'+genresDict.genres[i].name+'</a>';
				}
				var children = document.getElementById("genreAcc").children;
				for (var i = 0; i < children.length; i++){
					children[i].addEventListener('click',async function(event){
						resetGenre();
						target = event.target;
						searchStr = '/movie?movie='
						target.className += ' w3-light-grey';
						header.innerHTML = 'Genres - '+ target.innerHTML;
						target.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>'+target.innerHTML;
						try{
							let response = await fetch('http://127.0.0.1:8090/discover/genre?genre='+String(target.id));
							let body = await response.text();
							data = JSON.parse(body);
							console.log('api fetch success...');
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
	}
	
	function resetGenre(){
		var x = document.getElementById("genreAcc");
		var children = document.getElementById("genreAcc").children;
		for (var i = 0; i < children.length; i++){
			children[i].classList.remove('w3-light-grey');
			children[i].innerHTML = children[i].innerHTML.replace('<i class="fa fa-caret-right w3-margin-right"></i>','');
		}
	}
	
	function resetYou(){
		var x = document.getElementById("youAcc");
		var children = document.getElementById("youAcc").children;
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
	
	find.addEventListener('click',function(){
		resetAll();
		find.className += ' w3-white';
		header.innerHTML = 'Find';
		closeAll();
	});
	
	you.addEventListener('click', function(){
		resetAll();
		you.className += ' w3-white';
		header.innerHTML = 'You';
		closeAll();
		youAccFunc();
	});
	
	function resetAll(){
		trending.classList.remove('w3-white');
		actors.classList.remove('w3-white');
		genres.classList.remove('w3-white');
		discover.classList.remove('w3-white');
		find.classList.remove('w3-white');
		you.classList.remove('w3-white');
		resetGenre();
		resetDis();
		resetYou();
		genres.innerHTML = 'Genres <i class="fa fa-caret-right"></i>';
		discover.innerHTML = 'Discover <i class="fa fa-caret-right"></i>';
		you.innerHTML = 'You <i class="fa fa-caret-right"></i>';
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
		
		var z = document.getElementById('youAcc');
		if (you.className.indexOf("w3-white") == -1) {
			z.className = z.className.replace(" w3-show", "");
		}
		
	}
	
	function genreAccFunc() {
	  var x = document.getElementById("genreAcc");
	  if (x.className.indexOf("w3-show") == -1) {
		genres.innerHTML = 'Genres <i class="fa fa-caret-down"></i>';
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
	
	function youAccFunc(){
		var x = document.getElementById("youAcc");
		if (x.className.indexOf("w3-show") == -1) {
			you.innerHTML = 'You <i class="fa fa-caret-down"></i>';
			x.className += " w3-show";
		} else {
			x.className = x.className.replace(" w3-show", "");
		}
	}
	
	top_rated.addEventListener('click', async function(event){
		resetDis();
		top_rated.className += ' w3-light-grey';
		header.innerHTML = 'Discover - Top Rated';
		top_rated.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>Top Rated';
		console.log('DOM updated...')
		searchStr = '/movie?movie=';
		try{
			let response = await fetch('http://127.0.0.1:8090/discover/top_rated');
			let body = await response.text();
			data = JSON.parse(body);
			console.log('api fetch success...');
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	popular.addEventListener('click', async function(event){
		resetDis();
		popular.className += ' w3-light-grey';
		header.innerHTML = 'Discover - Popular';
		popular.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>Popular';
		console.log('DOM updated...')
		searchStr = '/movie?movie=';
		try{
			let response = await fetch('http://127.0.0.1:8090/discover/popular');
			let body = await response.text();
			data = JSON.parse(body);
			console.log('api fetch success...');
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	now_playing.addEventListener('click', async function(event){
		resetDis();
		now_playing.className += ' w3-light-grey';
		header.innerHTML = 'Discover - Now Playing';
		now_playing.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>Now Playing';
		console.log('DOM updated...')
		searchStr = '/movie?movie=';
		try{
			let response = await fetch('http://127.0.0.1:8090/discover/now_playing');
			let body = await response.text();
			data = JSON.parse(body);
			console.log('api fetch success...');
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	
	upcoming.addEventListener('click', async function(event){
		resetDis();
		upcoming.className += ' w3-light-grey';
		header.innerHTML = 'Discover - Upcoming';
		upcoming.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>Upcoming';
		console.log('DOM updated...')
		searchStr = '/movie?movie=';
		try{
			let response = await fetch('http://127.0.0.1:8090/discover/upcoming');
			let body = await response.text();
			data = JSON.parse(body);
			console.log('api fetch success...');
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	ratedBy.addEventListener('click', async function(event){
		resetYou();
		ratedBy.className += ' w3-light-grey';
		header.innerHTML = 'You - Rated';
		ratedBy.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>Rated by you';
		console.log('DOM updated...')
		searchStr = '/movie?movie=';
		try{
			let response = await fetch('http://127.0.0.1:8090/account/rated');
			if(!response.ok){
			  alert('403 forbidden error: no active session');
			}
			let body = await response.text();
			data = JSON.parse(body);
			console.log('api fetch success...');
			display_query(data);
		} catch(e) {
			console.log(e);
		}
	});
	
	favouriteY.addEventListener('click', async function(event){
		resetYou();
		favouriteY.className += ' w3-light-grey';
		header.innerHTML = 'You - Favourite';
		favouriteY.innerHTML = '<i class="fa fa-caret-right w3-margin-right"></i>Favourite';
		console.log('DOM updated...')
		searchStr = '/movie?movie=';
		try{
			let response = await fetch('http://127.0.0.1:8090/account/favourite');
			if(!response.ok){
			  alert('403 forbidden error: no active session');
			}
			let body = await response.text();
			data = JSON.parse(body);
			console.log('api fetch success...');
			display_query(data);
		} catch(e) {
			console.log(e);
		}
	});
	
	
	function resetDis(){
		var children = document.getElementById("disAcc").children;
		for (var i = 0; i < children.length; i++){
			children[i].classList.remove('w3-light-grey');
			children[i].innerHTML = children[i].innerHTML.replace('<i class="fa fa-caret-right w3-margin-right"></i>','');
		}
	}
	
	
	authenticate.addEventListener('click', async function(event){
		var data;
		try{
			let response = await fetch('http://127.0.0.1:8090/authentication/token/new');
			let body = await response.text();
			console.log('api fetch success...');
			data = JSON.parse(body);
		} catch(e) {
			alert(e);
		}
		if (data.success){
			window.location = ('https://www.themoviedb.org/authenticate/'+data.request_token+'?redirect_to=http://127.0.0.1:8090/authentication/session/new');
			
		} else {
			alert('Failure to receive authentication token');
		}
	});
	
	function setup_rate(){
		var x = document.getElementById('drop_down_rate');
		x.innerHTML ='<a class="w3-button w3-black w3-tiny" id="rating"><b>10</b></a>';
		for (i=0;i<10;i++){
			x.innerHTML += '<a class="w3-button w3-black w3-small fa fa-star checked" id="rate'+String(i+1)+'" onmouseover="hover_rate(event)" onclick="rate_movie(event)"></a>';
		}
		x.innerHTML+='<a class="w3-button w3-red w3-small fa fa-ban" id="delete" onclick="delete_rating()"></a>'
		
	};
	
	favourite.addEventListener('click', async function(event){
		//toggle favourite
		var id= movie_id;
		var fav;

		fav = favourite.className.indexOf('w3-red')==-1;

		
		try{
			let response = await fetch('http://127.0.01:8090/movie/favourite',
									   {
										 method: "POST",
										 headers: {
										   "Content-Type": "application/x-www-form-urlencoded"
										 },
										 body: "id=" + id+'&favourite='+fav
									   });
			if(!response.ok){
			  alert('403 forbidden error: no active session');
			} else {
				if (fav){
				favourite.innerHTML = '<i class="fa fa-thumbs-up"></i> Favourite';
				favourite.className = 'w3-button w3-red w3-right'; 
				console.log('film marked as favourite');
			  } else {
				favourite.innerHTML = '<i class="fa fa-thumbs-up"></i> Mark as Favourite';
				favourite.className = 'w3-button w3-black w3-right';
				console.log('film unmarked as favourite');
			  }
			}
		} catch (e) {
			alert (e);
		}
	});

	search.addEventListener('click', async function(event){
		var query = queryBox.value;
		header.innerHTML = 'Search Results...';
		
		try{
			let response = await fetch('http://127.0.0.1:8090/search'+searchStr+query);
			let body = await response.text();
			data = JSON.parse(body);
			console.log('api fetch success...');
			display_query(data);
		} catch(e) {
			alert(e);
		}
	});
	
	next.addEventListener('click',async function(event){
		try{
			let response = await fetch('http://127.0.0.1:8090/page?next=1');
			if (!response.ok){
				console.log('404 not found error: page out of bounds')
			} else {
				let body = await response.text();
				data = JSON.parse(body);
				console.log('api fetch success...');
				display_query(data);
				topF();
			}
		} catch(e) {
			alert(e);
		}
	});
	
	previous.addEventListener('click',async function(event){
		try{
			let response = await fetch('http://127.0.0.1:8090/page?next=0');
			if (!response.ok){
				console.log('404 not found error: page out of bounds')
			} else {
				let body = await response.text();
				data = JSON.parse(body);
				console.log('api fetch success...');
				display_query(data);
				topF();
			}
		} catch(e) {
			alert(e);
		}
	});
	
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
	setup_genres();
	setup_rate();
	trending.click();

});