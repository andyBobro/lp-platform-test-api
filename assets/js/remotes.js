document.addEventListener("DOMContentLoaded", initPage);

function load (input, pre) {
	var url = input.value

	axios.get(url).then(function (res) {
		pre.innerHTML = JSON.stringify(res, 0, 2)
		console.log('LOADED / UPDATED');
	})
}

function autoUpdate (cb) {
	var reloader = setInterval(cb, 1000)
}

function initPage () {
	var input = document.getElementById('url'),
			submit = document.getElementById('submit'),
			reload = document.getElementById('reload'),
			pre = document.getElementById('pre'),
			isLoaded = false

	submit.addEventListener('click', function () {
		load(input, pre)
		setInterval(function () {
			load(input, pre)
		}, 600000)
	})
	reload.addEventListener('click', function () {
		load(input, pre)
	})

}
