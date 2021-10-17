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

let legend; //заголовок
let form;
let input;
let label;
let colorList; //для input type=color
let option; //для select input
let button; //кнопка
let links; //блок с ссылками
let ref; //ссылка
let p; //текст

function displayForm(contentData) {
	//создаём форму
	form = document.createElement("form");
	// console.log(contentData);
	Object.entries(contentData).forEach(([key, value]) => {
		//form name
		if (key === "name") {
			legend = document.createElement("legend");
			legend.innerText = `${value}`;
			form.appendChild(legend);

			form.setAttribute("name", `${value}`);
			form.classList.add(`${value}`);
			container.appendChild(form);
			if (value === "website_color_scheme") {
				form.classList.add("scheme");
			}
		}

		//inputs & labels
		if (key === "fields") {
			if (Array.isArray(value)) {
				value.forEach((item) => {
					Object.entries(item).forEach(([key, value]) => {
						if (key === "label") {
							return createLabel(value);
						}

						if (key === "input") {
							return createInput(value);
						}
					});
				});
			}
		}

		//references
		if (key === "references") {
			links = document.createElement("div");
			links.classList.add("links");

			if (Array.isArray(value)) {
				value.forEach((item) => {
					Object.entries(item).forEach(([key, value]) => {
						if (key === "input") {
							return createCheckbox(value);
						} else {
							return createReferences([key, value]);
						}
					});
				});
			}
		}

		//buttons
		if (key === "buttons") {
			if (Array.isArray(value)) {
				value.forEach((item) => {
					Object.entries(item).forEach(([key, value]) => {
						return createButton([key, value]);
					});
				});
			}
		}
	});
}

//создаём label
function createLabel(value) {
	label = document.createElement("label");
	label.setAttribute("for", `input`);
	label.innerText = `${value}`;
	form.appendChild(label);
}

//создаём input
function createInput(value) {
	Object.entries(value).forEach(([key, value]) => {
		if (key === "type") {
			if (value === "technology") {
				input = document.createElement("select");
				input.classList.add("select");
				input.id = "multSelect";
				input.setAttribute("data-placeholder", " ");
				setTimeout(multipleSelect, 0);
			} else {
				input = document.createElement("input");
				input.setAttribute("type", `${value}`);
				input.classList.add(`${value}`);
				input.setAttribute("id", `${value}`);
			}

			//добавил класс чтобы UI поправить
			if (value === "file") {
				input.classList.add("inputFile");
			}
		}

		//textarea
		if (key === "type") {
			if (value === "textarea") {
				input = document.createElement("textarea");
				input.setAttribute("rows", "5");
			}
		}

		// добавляем маску
		if (key === "mask") {
			input.type = "text";
			let num = Math.random().toFixed(2) * 200;
			let idName =  `${key}${num}`;
            input.id = `${idName}`;
            console.log(idName);
			$(`${'#'}${idName}`).mask(`${value}`);
		}

		//подтягиваем option для select
		if (key === "technologies") {
			for (let i = 0; i < value.length; i++) {
				option = document.createElement("option");
				// option.setAttribute("value", `${value[i]}`);
				option.innerText = value[i];
				input.appendChild(option);
			}
		}

		//фильтр для выбора файлов
		if (key === "filetype") {
			let fileType = [];
			for (let i = 0; i < value.length; i++) {
				fileType.push("." + value[i]);
			}
			let type = fileType.join(",");
			input.setAttribute("accept", `${type}`);
		}

		//проверка еслть ли множественный выбор
		if (key === "multiple") {
			input.setAttribute("multiple", ``);
		}

		//проверка есть ли placeholder
		if (key === "placeholder") {
			input.setAttribute("placeholder", `${value}`);
		}

		//проверка заполнено ли поле
		if (key === "required") {
			if (value === true) {
				input.setAttribute("required", ``);
			}
		}

		//добавляем определённые цвета в input type = color
		if (key === "colors") {
			input.setAttribute("list", "dataList");
			colorList = document.createElement("datalist");
			colorList.id = "dataList";

			for (let i = 0; i < value.length; i++) {
				option = document.createElement("option");
				option.innerText = `${value[i]}`;
				colorList.appendChild(option);
			}
			form.appendChild(colorList);
		}
	});
	form.appendChild(input);
}

//создаём checkbox
function createCheckbox(value) {
	Object.entries(value).forEach(([key, value]) => {
		if (key === "type") {
			input = document.createElement("input");
			input.setAttribute("type", `${value}`);
		}

		//проверка отмечен ли checkbox
		if (key === "required") {
			input.setAttribute("required", ``);
		}
		links.appendChild(input);
	});

	form.appendChild(links);
}

//создаём references
function createReferences([key, value]) {
	if (key === "text without ref") {
		ref = document.createElement("p");
		ref.innerText = value;
		links.appendChild(ref);
	}

	if (key === "text") {
		ref = document.createElement("a");
		ref.classList.add("signIn");
		ref.innerText = value;
		links.appendChild(ref);
	}

	if (key === "ref") {
		ref.setAttribute("href", value);
	}

	form.appendChild(links);
}

//создаём button
function createButton([key, value]) {
	button = document.createElement("button");
	button.setAttribute("type", "submit");
	button.innerText = value;
	form.appendChild(button);
}

//кнопка удаления формы
container.addEventListener("click", function (event) {
	if (event.target.classList.value === "deleteBtn") {
		container.removeChild(form);
	}
});

//добавляем маску
function addMask(value) {
	console.log(value);
	$(document).ready(function () {
		$("").mask(`${value}`);
	});
}

// множественный выбор select option
function multipleSelect() {
	$("#multSelect").chosen();
}
