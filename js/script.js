const upload = document.querySelector('#upload');
const container = document.querySelector('.container');


upload.addEventListener('change', function (e) {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function () {
		contentData = JSON.parse(reader.result);

		displayForm(contentData)
	}
});



function displayForm(contentData) {
	let form = document.createElement('form');
	form.setAttribute('name', `${contentData.name}`)
	container.appendChild(form)

	let inputText;

	for (let i = 0; i < contentData.fields.length; i++) {
		let inputData = contentData.fields[i].input;

		inputText = document.createElement('input');
		inputText.setAttribute('type', `${inputData.type}`);

		if (inputData.required) inputText.setAttribute('required', '');
		inputText.setAttribute('placeholder', `${inputData.placeholder}`);
		form.appendChild(inputText)
	}

	let resetBtn = document.createElement('button');
	resetBtn.setAttribute('type', 'reset');
	resetBtn.innerHTML = 'Reset'

	let deleteForm = document.createElement('button');
	deleteForm.setAttribute('type', 'button');
	deleteForm.setAttribute('id', 'deleteBtn');
	deleteForm.innerHTML = 'Delete form'


	form.appendChild(resetBtn)
	form.appendChild(deleteForm)


	form.addEventListener('click', function(e){
		if(e.target.id === 'deleteBtn') {
			container.removeChild(form)
		}
	})
}





// function Remove(form_id) {
// 	if (window.confirm('Remove this form?')) {
// 		var f = document.getElementById(form_id);
// 		f.parentNode.removeChild(f);
// 	}
// }



// function displayForm() {
// let form = document.createElement('form');
// form.setAttribute('name', 'addPost')


// console.log(1);
// let p = document.createElement('p');
// p.innerText = "Hello"

// form.appendChild(p);

// container.appendChild(form)

	// let content = `
	// <form action="" name="addpost">
	// 		<label for="">Title</label>
	// 		<input type="text" required>

	// 		<label for="">Description</label>
	// 		<input type="textarea" required>

	// 		<label for="">Image</label>
	// 		<input type="file" required>

	// 		<label for="inputDate">Publish Date</label>
	// 		<input type="date" id="inputDate" required>

	// 		<label for="">Author</label>
	// 		<input type="text">

	// 		<input type="checkbox" required>

	// 		<button>Create Post</button>
	// 	</form>
	// `

	// container.innerHTML = content;




