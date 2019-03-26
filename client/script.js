async function display_movie(event){
	var target = event.target;
	var id = target.id;
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
	document.getElementById('movie_display').style.display='block'
	if (data){
		document.getElementById('title').innerHTML=data.title;
		document.getElementById('backdrop').style.backgroundImage="url('https://image.tmdb.org/t/p/original"+data.backdrop_path+"')";
	}
	
	//display: backdrop, poster, title, tag line, release date, language, runetime, realeased?, populatiry, vote average, genres, overview, actors and crew -> link (get credits method), homepage, budget, revenue, production companies
}

async function display_person(event){
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
	if (data){
		document.getElementById('name').innerHTML=data.name;
	}
	
	//diplay: name, pictures, birthday - death day, birth place, Actor/Director, biography, popularity, films and characters -> link (get credits method), put id somewhere
	
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
		film = data.results[1];
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