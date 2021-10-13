const upload = document.querySelector("#upload");
const container = document.querySelector(".container");

//загружаем файл
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
let label;
let signUp; //кнопка
let links; //блок с ссылками
let ref; //ссылка
let p; //текст


//отображаем форму
function displayForm(contentData) {
	//создаём форму
	let form = document.createElement("form");
	form.setAttribute("name", `${contentData.name}`);
	container.appendChild(form);

	//перебираем input
	contentData.fields.forEach((item) => {
		console.log(item);

		if (item.label && item.input) {
			return createInputAndLabel(item);
		}

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

	//создаём input & label
	function createInputAndLabel(item) {
		label = document.createElement("label");
		inputText.setAttribute("type", `${input.type}`);
		inputText.setAttribute("placeholder", `${input.placeholder}`);
		inputText.setAttribute("required", ``);
		form.appendChild(inputText);
	}


	//создаём button Sign Up
	contentData.buttons.forEach((item) => {
		Object.values(item).forEach((i) => {
			signUp = document.createElement("button");
			signUp.setAttribute("type", "submit")
			signUp.innerText = i;
			form.appendChild(signUp);
		});
	});


	//кнопка удаления формы
	container.addEventListener('click', function (event) {
		if (event.target.classList.value === "deleteBtn") {
			container.removeChild(form);
		}
	})

	//перемистить куда надо
	links = document.createElement('div');
	links.classList.add("links");
	form.appendChild(links);

	//создаём ссылку под формой
	contentData.references.forEach((item) => {

		for (i in item) {
			if (i === "text without ref") {
				p = document.createElement("p");
				p.innerText = item[i];
				links.appendChild(p);
			} else if (i === "text") {
				ref = document.createElement("a");
				ref.innerText = item[i];
				ref.setAttribute("href", `${item.ref}`);
				ref.classList.add("signIn");
				links.appendChild(ref);
			}
		}
	});
}
