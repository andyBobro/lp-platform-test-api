document.addEventListener("DOMContentLoaded", initPage);

function load (input, pre) {
	var data = input.value

	pre.innerHTML = JSON.stringify(JSON.parse(data), 0 ,2)
}

function initPage () {
	var input = document.getElementById('url'),
			submit = document.getElementById('submit'),
			pre = document.getElementById('pre')

	submit.addEventListener('click', function () {
		load(input, pre)
	})

}
