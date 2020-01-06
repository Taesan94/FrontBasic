const weather = document.querySelector(".js-weather");

const API_KEY = "8fe30ce07d8d5677158bef90a0f2bc87"; // home.openweathermap.org 회원가입 후 key받았음.
const COORDS = "coords";

function getWeather(lat, lon){
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
	).then(function(response){ // then 사용하면 fetch가 완료되길 기다린다.
		return response.json();
	}).then(function(json){
		const temperature = json.main.temp;
		const place = json.name;
		weather.innerText = `${temperature} @ ${place}`;
		console.log(json);
	});
}


function saveCoords(coordsObj){
	localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
	console.log(position);
	
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	
	const coordsObj = { // 객체에 latitude = latitude, longitude=longitude 이렇게 같은 변수 들어가면 아래처럼 생략 가능 함
			latitude,
			longitude
	};
	
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError(){
	console.log("Can't access geo location");
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
	
}

function loadCoords(){
	const loadedCords = localStorage.getItem(COORDS);
	
	if ( loadedCords === null ){
		askForCoords();
	} else {
		const parseCoords = JSON.parse(loadedCords);
		console.log(parseCoords);
		getWeather(parseCoords.latitude,parseCoords.longitude);
	}
}

function init(){
	loadCoords();
}

init();