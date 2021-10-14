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
let option; //для select input
let signUp; //кнопка
let links; //блок с ссылками
let ref; //ссылка
let p; //текст

//отображаем форму
function displayForm(contentData) {
	//создаём форму
	let form = document.createElement("form");
	form.setAttribute("name", `${contentData.name}`);
	form.classList.add(`${contentData.name}`);
	container.appendChild(form);

	//перебираем input
	contentData.fields.forEach((item, i) => {
		if (item.label && item.input) {
			return createInputAndLabel(item, i);
		} else if (item.input.type === "text") {
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
	function createInputAndLabel(item, i) {
		//input
		//проверка на тип input
		if (item.input.type === "technology") {
			inputText = document.createElement("select");
			inputText.classList.add("select");
			if(item.input.multiple) inputText.setAttribute("multiple", ``);
			inputText.setAttribute("id", `id_${i}`);
			inputText.setAttribute("size", `2`);
			for (let i = 0; i < item.input.technologies.length; i++) {
				option = document.createElement("option");
				option.setAttribute("value", `${item.input.technologies[i]}`);
				option.innerText = item.input.technologies[i];
				inputText.appendChild(option);
			}
		} else {
			inputText = document.createElement("input");
			inputText.setAttribute("type", `${item.input.type}`);
			inputText.setAttribute("id", `id_${i}`);
		}

		//label
		label = document.createElement("label");
		label.setAttribute("for", `id_${i}`);
		label.innerText = `${item.label}`;

		//добавил класс чтобы UI поправить
		if (item.input.type === "file") {
			inputText.classList.add("inputFile");
		}

		//добавил класс чтобы UI поправить
		if (item.input.type === "color") {
			inputText.classList.add("inputColor");
		}

		//проверка есть ли placeholder
		if (item.input.placeholder) inputText.setAttribute("placeholder", `${item.input.placeholder}`);

		//проверка есть ли required
		if (item.input.required) inputText.setAttribute("required", ``);

		//проверка есть ли colors
		if (item.input.colors) inputText.setAttribute("value", `${item.input.colors}`);

		//проверка есть ли mask
		if (item.input.mask) inputText.setAttribute("mask", `${item.input.mask}`);


		$('#phoneNumber').inputmask("(999) 999-9999");
		//добавляем в форму
		form.appendChild(label);
		form.appendChild(inputText);
	}

	//кнопка удаления формы
	container.addEventListener("click", function (event) {
		if (event.target.classList.value === "deleteBtn") {
			container.removeChild(form);
		}
	});

	//создаём button Sign Up
	if (contentData.buttons) {
		contentData.buttons.forEach((item) => {
			Object.values(item).forEach((i) => {
				signUp = document.createElement("button");
				signUp.setAttribute("type", "submit");
				signUp.innerText = i;
				form.appendChild(signUp);
			});
		});
	}

	//создаём ссылки под формой
	if (contentData.references) {
		links = document.createElement("div");
		links.classList.add("links");
		contentData.references.forEach((item) => {
			if (item.input) {
				inputText = document.createElement("input");
				inputText.setAttribute("type", `${item.input.type}`);
				inputText.setAttribute("required", ``);
				// inputText.setAttribute("checked", ``);
				links.appendChild(inputText);
			} else {
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
			}
		});

		form.appendChild(links);
	}
}
