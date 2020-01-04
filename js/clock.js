const clockContainer = document.querySelector(".js-clock");
const clockTtile = clockContainer.querySelector("h1");

function getTime() {
	const date = new Date();
	const minutes = date.getMinutes();
	const hours = date.getHours();
	const seconds = date.getSeconds();
	
	// 아래 백틱문자(`)를 사용한 문법은 문자열 표현형식 중 템플릿 리터럴 개념..!
	clockTtile.innerText = `${hours < 10 ? `0${hours}` : hours }:${
	 minutes < 10 ? `0${minutes}` : minutes 
	 }:${ seconds < 10 ? `0${seconds}` : seconds }`;
}

function init() {
	getTime();
	setInterval(init,1000);
}

init();