function getValue(query) {
	return document.querySelector(query).value
}

var users = new Database('users')
var errorMessage = document.getElementById("error_message")

function login() {
	var user = users.get('username', getValue('input#username'))
	if (user == undefined){
		errorMessage.innerText = "მომხმარებელი არ არსებობს";
		return; 
	}
	if (user.password === getValue('input#password')) {
		localStorage.setItem('status', 'loggedin')
		window.location = "./index.html"
	} else {
		console.log('wrong password')
		errorMessage.style.display = "block"
		errorMessage.innerText = "პაროლი არასწორია"
	}

}
