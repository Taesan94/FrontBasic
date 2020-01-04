const clockContainer = document.querySelector(".js-clock");
const clockTtile = clockContainer.querySelector("h1");

function getTime() {
	const date = new Date();
	const minutes = date.getMinutes();
	const hours = date.getHours();
	const seconds = date.getSeconds();
	
	clockTtile.innerText = `${hours < 10 ? `0${hours}` : hours }:${
	 minutes < 10 ? `0${minutes}` : minutes 
	 }:${ seconds < 10 ? `0${seconds}` : seconds }`;
}

function init() {
	getTime();
	setInterval(init,1000);
}

init();