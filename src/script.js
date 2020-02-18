//Вход в личный кабинет
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
			break;
		}

		else {
			alert("Неверный логин или пароль");
		}
	}
}

//кнопка войти
let buttonEntrance = document.getElementsByClassName('access');
   for (i=0; i<buttonEntrance.length; i++)
   buttonEntrance[i].onclick  = function() {
        getAdmin();
  };

// кнопка регистрации
let buttonRegistration = document.getElementsByClassName('registration');
   for (i=0; i<buttonRegistration.length; i++)
   buttonRegistration[i].onclick = function(){
        posetUser();
  };

//Вход в корзину
let basket = document.getElementById('basket');	
let iconBasket = document.getElementsByClassName('icon-basket');
let buttonClose = document.getElementsByClassName('basket-close');
for (i = 0; i < iconBasket.length; i++) 
	iconBasket[i].onclick = function() {
	basket.style.display="flex";
}
for (i = 0; i < buttonClose.length; i++) 
	buttonClose[i].onclick = function close() {
	basket.style.display="none";
}

//Добовление товара в корзину
let buttonBasket = document.getElementsByClassName("button-basket");
for (i = 0; i < buttonBasket.length; i++) 
	buttonBasket[i].onclick = function() {
	postBasket();
}
function postBasket() {
let productTitle = document.getElementById("product-title").textContent;
let price = document.getElementById("price").textContent;
let [pric] = price;

console.log(productTitle + " " + pric.length);

console.log(productTitle + " " + price);
}

//Список желаний 
let favorite = document.getElementById('favorite');	
let iconFavorite = document.getElementsByClassName('icon-heart');
let favoriteClose = document.getElementsByClassName('favorite-close');
for (i = 0; i < iconFavorite.length; i++) 
	iconFavorite[i].onclick = function() {
	favorite.style.display="flex";
}
for (i = 0; i < favoriteClose.length; i++) 
	favoriteClose[i].onclick = function close() {
	favorite.style.display="none";
}


//Лучшие товары
let topRecommendations = document.getElementsByClassName("top-recommendations");
let topNew = document.getElementsByClassName("top-new");
let topSale = document.getElementsByClassName("top-sale");

let recommendationsProduct = document.getElementById("recommendations-product");
let newProduct = document.getElementById("new-product");
let saleProduct = document.getElementById("sale-product");
for (i = 0; i < topRecommendations.length; i++) 
	topRecommendations[i].onclick = function () {
	recommendationsProduct.style.display="flex";
	newProduct.style.display="none";
	saleProduct.style.display="none";
}
for (i = 0; i < topNew.length; i++) 
	topNew[i].onclick = function () {
	newProduct.style.display="flex";
	recommendationsProduct.style.display="none";
	saleProduct.style.display="none";
}
for (i = 0; i < topSale.length; i++) 
	topSale[i].onclick = function () {
	saleProduct.style.display="flex";
	recommendationsProduct.style.display="none";
	newProduct.style.display="none";


}


//кнопка показать ещё
let news = 0;
let sale = 0;
let recommendations = 0;
//button
let allNew = document.getElementsByClassName("all-new");
let allRecommendations = document.getElementsByClassName("all-recommendations");
let allSale = document.getElementsByClassName("all-sale");
//content
let recommendationsContent = document.getElementById("recommendations-product-content");
let newContent = document.getElementById("new-product-content");
let saleContent = document.getElementById("sale-product-content");
   for (i=0; i<allRecommendations.length; i++)
   allRecommendations[i].onclick = function() {
   	if (recommendations%2 == 0) {
	recommendationsContent.style.height="auto";
	}
	if (recommendations%2 != 0) {
	recommendationsContent.style.height="336px";
	}
	recommendations++;
}
   for (i=0; i<allNew.length; i++)
   allNew[i].onclick = function() {
   	if (news%2 == 0) {
	newContent.style.height="auto";
	}
	if (news%2 != 0) {
	newContent.style.height="336px";
	}
	news++;
}
   for (i=0; i<allSale.length; i++)
   allSale[i].onclick = function() {
   	if (sale%2 == 0) {
	saleContent.style.height="auto";
	}
	if (sale%2 != 0) {
	saleContent.style.height="336px";
	}
	sale++;
}

