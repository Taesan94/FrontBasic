const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");


const TODO_LS = "toDos";

let toDos = [];

function filterFn(toDo){
	return toDo.id === 1;
}

function deleteToDo(event){
	
	// console.dir(event.target) // 선택된 태그의 상세정보를 볼 수 있음.
	
	/*
	 * event.target : 어떤태그를 선택했는지 나옴. <button>X</button>
	 * event.target.parentNode : 해당 버튼의 부모태그를 알 수 있음.
	 * 
	 * 해당 프로젝트의 toDoList출력 HTML
	 * : <ul class="js-toDoList">
	 * 		<li> <button>X</button><span>toDoList1</span></li>
	 * 		<li> <button>X</button><span>toDoList2</span></li>
	 *  </ul>
	 */
	
	const btn = event.target; // 선택된 태그의
	const li = btn.parentNode; // 부모노드( 현재는 선택된 li태그-id를 가지고 있음. )
	toDoList.removeChild(li); // <ul>의 자식 <li> 삭제
	
	// filter메서드는 array의 모든 아이템을 통해 함수를 싱행 함.
	// return이 true인대상들로 새로운 array생성.
	const cleanToDos = toDos.filter(function(toDo){
		return toDo.id !== parseInt(li.id); // X버튼 눌렀을 때, 선택 된 id만 false를 반환, 즉.. 선택된 li빼고 새로 배열을 create하게 된다.
	});
	
	// X는 빼고 새로 생성된 배열을 다시 toDos에 초기화 후 다시 저장해주면 된다.
	toDos = cleanToDos;
	saveToDos();
	
}

function saveToDos(){
	localStorage.setItem(TODO_LS,JSON.stringify(toDos));
}

function paintToDo(text){
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	const span = document.createElement("span");
	const newId = toDos.length+1;

	delBtn.innerHTML ="X";
	delBtn.addEventListener("click", deleteToDo);
	span.innerText = text ;

	li.appendChild(delBtn);
	li.appendChild(span);
	li.id = newId;

	toDoList.appendChild(li);

	const toDoObj = {
			text : text,
			id : newId
	};
	
	toDos.push(toDoObj);
	saveToDos();
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = toDoInput.value;
	paintToDo(currentValue);
	toDoInput.value = "";
}

function loadToDos(){
	const loadedToDos = localStorage.getItem(TODO_LS);
	
	if( loadedToDos !== null ){
		const parsedToDos = JSON.parse(loadedToDos);
		
		parsedToDos.forEach(function(toDo){
			paintToDo(toDo.text);
		})
	}
}


function init() {
	loadToDos();
	toDoForm.addEventListener("submit", handleSubmit);
}

init();