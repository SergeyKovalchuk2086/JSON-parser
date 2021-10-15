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

let form;
let inputText;
let inputEmail;
let inputPassword;
let label;
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
        if (key === 'name') {
            form.setAttribute("name", `${value}`);
            form.classList.add(`${value}`);
            container.appendChild(form);
        }

        //inputs & labels
        if (key === "fields") {
            if (Array.isArray(value)) {
                value.forEach(item => {
                    Object.entries(item).forEach(([key, value]) => {
                        if (key === "label") {
                            return createLabel(value);
                        }

                        if (key === 'input') {
                            return createInput(value);
                        }
                    })
                })
            }
        };

        //references
        if (key === "references") {
            links = document.createElement("div");
            links.classList.add("links");

            if (Array.isArray(value)) {
                value.forEach(item => {
                    Object.entries(item).forEach(([key, value]) => {
                        if (key === "input") {
                            return createCheckbox(value);
                        } else {
                            return createReferences([key, value]);
                        }
                    })
                })
            }
        }

        //buttons
        if (key === "buttons") {
            if (Array.isArray(value)) {
                value.forEach(item => {
                    Object.entries(item).forEach(([key, value]) => {
                        return createButton([key, value]);
                    })
                })
            }
        }
    })
}

//создаём label
function createLabel(value) {
    // console.log(value);
    label = document.createElement("label");
    label.setAttribute("for", `input`);
    label.innerText = `${value}`;
    form.appendChild(label);
}

//создаём input
function createInput(value) {
    Object.entries(value).forEach(([key, value]) => {
        if (key === 'type') {
            if (value === "technology") {
                inputText = document.createElement("select");
                inputText.classList.add("select");
                inputText.setAttribute("size", `2`);
            } else {
                inputText = document.createElement("input");
                inputText.setAttribute("type", `${value}`);
                inputText.classList.add(`${value}`);
                inputText.setAttribute("id", `${value}`);
            }

            //добавил класс чтобы UI поправить
            if (value === "file") {
                inputText.classList.add("inputFile")
            }
        }

        //подтягиваем option для select
        if (key === "technologies") {
            for (let i = 0; i < value.length; i++) {
                option = document.createElement("option");
                option.setAttribute("value", `${value[i]}`);
                option.innerText = value[i];
                inputText.appendChild(option);
            }
        }

        //фильтр для выбора файлов
        if (key === 'filetype') {
            let fileType = [];
            for (let i = 0; i < value.length; i++) {
                fileType.push('.' + value[i]);
            }
            let type = fileType.join(',');
            inputText.setAttribute("accept", `${type}`);
        }

        //проверка еслть ли множественный выбор
        if (key === "multiple") {
            inputText.setAttribute("multiple", ``);
        }

        //проверка есть ли placeholder
        if (key === "placeholder") {
            inputText.setAttribute("placeholder", `${value}`);
        }

        //добавить проверку
        if (value === true) {
            inputText.setAttribute("required", ``);
        }

        if (key === "required") {
            inputText.setAttribute("required", ``)
        }
    })
    form.appendChild(inputText);
}

//создаём checkbox
function createCheckbox(value) {
    Object.entries(value).forEach(([key, value]) => {
        if (key === "type") {
            inputText = document.createElement("input");
            inputText.setAttribute("type", `${value}`);
        }

        if (key === "required") {
            inputText.setAttribute("required", ``)
        }
        links.appendChild(inputText);
    })

    form.appendChild(links);
}

//создаём references
function createReferences([key, value]) {
    if (key === "text without ref") {
        ref = document.createElement('p');
        ref.innerText = value;
        links.appendChild(ref);
    }

    if (key === "text") {
        ref = document.createElement("a");
        ref.classList.add("signIn");
        ref.innerText = value;
        links.appendChild(ref);
    }

    if (key === 'ref') {
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

$(document).ready(function() {
    $("#text").mask("+7 (999) 99-99-999");
});
