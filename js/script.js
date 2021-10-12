const upload = document.querySelector("#upload");
const container = document.querySelector(".container");

upload.addEventListener("change", function (e) {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function () {
		contentData = JSON.parse(reader.result);
		displayForm(contentData);
	};
});

let inputText;
let inputEmail;
let inputPassword;
let ref;

//отображаем форму
function displayForm(contentData) {
	let form = document.createElement("form");
	form.setAttribute("name", `${contentData.name}`);
	container.appendChild(form);

	//перебираем input
	contentData.fields.forEach((item) => {
		if (item.input.type === "text") {
			return createInput(item.input);
		} else if (item.input.type === "email") {
			return createInput(item.input);
		} else if (item.input.type === "password") {
			return createInput(item.input);
		}
	});

	//создаём input
	function createInput(input) {
		inputText = document.createElement("input");
		inputText.setAttribute("type", `${input.type}`);
		inputText.setAttribute("placeholder", `${input.placeholder}`);
		inputText.setAttribute("required", ``);
		form.appendChild(inputText);
	}

	//кнопки сброса и удаления формы
	let resetBtn = document.createElement("button");
	resetBtn.setAttribute("type", "reset");
	resetBtn.innerHTML = "Reset";

	let deleteForm = document.createElement("button");
	deleteForm.setAttribute("type", "button");
	deleteForm.setAttribute("id", "deleteBtn");
	deleteForm.innerHTML = "Delete form";

	form.appendChild(resetBtn);
	form.appendChild(deleteForm);

	//удалить
	form.addEventListener("click", function (e) {
		if (e.target.id === "deleteBtn") {
			container.removeChild(form);
		}
	});

	//создаём ссылки под формой
	contentData.references.forEach((item) => {
		Object.values(item).forEach((i) => {
			ref = document.createElement("a");
			ref.innerText = i;
			form.appendChild(ref);
		});
	});
}
