var users = new Database('users')

var usernameEM = document.getElementById("username")
var passwordEM = document.getElementById("password")
var repeatPasswordEM = document.getElementById("repeat_password")

var errorMessageEM = document.getElementById("error_message")

function authenticate_password(password, repeatPassword){
  let errorMessage = "";
  if (password != repeatPassword){
    errorMessage = "პაროლი არ ემთხვევა გამეორებულ პაროლს";
  }
  if (password.length < 8){
    errorMessage = "პაროლი უნდა შეიცავდეს 8 სიმბოლოს მაინც"
  }
  if(password.search("[0-9]") == -1)
    errorMessage = "პაროლი უნდა შეიცავდეს ერთ ციფრს მაინც";

  if(password.search("[A-Z]") == -1){
    errorMessage = "პაროლი უნდა შეიცავდეს ერთ მაინც დიდ სიმბოლოს";
  }
  if(password.search("[a-z]") == -1){
    errorMessage = "პაროლი უნდა შეიცავდეს ერთ მაინც პატარა სიმბოლოს";
  }
  
  return errorMessage;
}

function register(){
  let username = usernameEM.value
  let password = passwordEM.value
  let repeatPassword = repeatPasswordEM.value

  if (users.get(username) != undefined){
    errorMessageEM.innerText = "შეყვანილი username უკვე არსებობს"
    return;
  }
  let errorMsg = authenticate_password(password,repeatPassword);
  if (errorMsg != ""){
    errorMessageEM.innerText = errorMsg;
    return;
  }
  users.create({ name: username, password: password });
}
