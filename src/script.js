let contentUser = document.getElementById('user');	
let button = document.getElementsByClassName('user');
let close = document.getElementsByClassName('button-close');
for (i = 0; i < button.length; i++) 
	button[i].onclick = function() {
	contentUser.style.display="flex";
}
for (i = 0; i < close.length; i++) 
	close[i].onclick = function close() {
	contentUser.style.display="none";
}

//Админ
async function getAdmin() {
let response = await fetch ("http://localhost:3000/admin");
let content = await response.json();
	for (let key in content) {
		if (document.getElementById("password").value == content[key].password &&
			document.getElementById("login").value == content[key].login) {
			alert("Добро пожаловать!");
			contentUser.style.display="none";
		}	
		else {
			alert("Неверный логин или пароль");
		}
	}
}

//кнопка войти
let buttonEntrance = document.getElementsByClassName('access');
   for (i=0; i<buttonEntrance.length; i++)
   buttonEntrance[i].onclick = function() {
        getAdmin();
  };

// кнопка регистрации
let buttonRegistration = document.getElementsByClassName('registration');
   for (i=0; i<buttonRegistration.length; i++)
   buttonRegistration[i].onclick = function(){
        saveUser();
  };


