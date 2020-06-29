//Login to your account
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

//Admin
async function getAdmin() {
let response = await fetch ("http://localhost:3000/admin");
let content = await response.json();
	for (let key in content) {
		if (document.getElementById("password").value == content[key].password &&
			document.getElementById("login").value == content[key].login &&
			content[key].isAdmin == true
			) {
			document.location.href = "admin.html";
			alert("Вы вошли как админ");
			break;
		}
		else if (document.getElementById("password").value == content[key].password &&
				document.getElementById("login").value == content[key].login) {
				document.location.href = "index.html";
				alert("Вы вошли как покупатель");
		}
		// else {
		// 	alert("Ошибка");
		// }
	}
}

//registration
async function postAdmin() {
	let response = await fetch ("http://localhost:3000/admin" , {
 	method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body:  JSON.stringify({
      login: (document.getElementById("login").value),
      password: (document.getElementById("password").value)
    }),
 })
	alert("Вы успешно зарегистрировались");
	window.location.reload();
}

//Button enter
let buttonEntrance = document.getElementsByClassName('access');
   for (i=0; i<buttonEntrance.length; i++)
   buttonEntrance[i].onclick  = function() {
        getAdmin();
  };

// button registration
let buttonRegistration = document.getElementsByClassName('registration');
   for (i=0; i<buttonRegistration.length; i++)
   buttonRegistration[i].onclick = function(){
        postAdmin();
  };

//Product
async function getProduct() {
let response = await fetch ("http://localhost:3000/product");
let content = await response.json();
let recommendations = document.querySelector("#recommendations-product-content");
let news = document.querySelector("#new-product-content");
let sale = document.querySelector("#sale-product-content");
	for (let key in content) {		 
		recommendations.innerHTML += `
		<div id="product-content"> 
			<img src="${content[key].img}" alt="" class="img-product">
			<span id="product-title" >${content[key].title}</span>
		 	<span id="price">${content[key].price}</span> 
		  		<div class="menu-product"> 
		  			<button class="button-basket" data-id="${content[key].id}">В корзину</button>
		  			<div class="icon-favorite">
		  			<i class="far fa-heart"></i>
				</div> 	
		 </div> 
		`
		news.innerHTML += `
		<div id="product-content"> 
			<img src="${content[key].img}" alt="" class="img-product">
			<span id="product-title" >${content[key].title}</span>
		 	<span id="price">${content[key].price}</span> 
		  		<div class="menu-product"> 
		  			<button class="button-basket" data-id="${content[key].id}">В корзину</button>
		  			<div class="icon-favorite">
		  			<i class="far fa-heart"></i>
				</div> 	
		 </div> 
		`
		sale.innerHTML += `
		<div id="product-content"> 
			<img src="${content[key].img}" alt="" class="img-product">
			<span id="product-title" >${content[key].title}</span>
		 	<span id="price">${content[key].price}</span> 
		  		<div class="menu-product"> 
		  			<button class="button-basket" data-id="${content[key].id}">В корзину</button>
		  			<div class="icon-favorite">
		  			<i class="far fa-heart"></i>
				</div> 	
		 </div> 
		`
	}
}
getProduct();

// Корзина
async function putProductToBasket() { 
	const response = await fetch ("http://localhost:3000/product");
	const content = await response.json();
	const buttonBasket = document.getElementsByClassName("button-basket"); // Кнопка в корзину
		for (i = 0; i < buttonBasket.length; i++)
			buttonBasket[i].onclick =  function() {
				itemId = this.getAttribute('data-id'); //Узнать id продукта
				setItem(); //Функция сохранения id продукта в localStorage
				putProduct(); //Функция добавление товара в корзину
			}
		
		function setItem() {
			 localStorage.setItem("idProduct", JSON.stringify(itemId));
		}

		function getItem() {
			return JSON.parse(localStorage.getItem("idProduct"));
		}

//Вход в корзину
		const basket = document.getElementById('basket'); // Корзина
		const iconBasket = document.getElementsByClassName('icon-basket'); // Конопка входа в Коризну
		const basketProduct = document.getElementById("basket-product"); // содержимое  корзины
			for (i = 0; i < iconBasket.length; i++) 
				iconBasket[i].onclick =  function() {
					basket.style.display=" flex";
				}
//Добавление продукта в Корзину
		async function putProduct() {
			const response = await fetch ("http://localhost:3000/product");
    		const content = await response.json(); 
    		let idItem = getItem(); //Получение Id товара
				for (let key in content) {
					if (idItem === `${content[key].id}`) { 
						basketProduct.innerHTML += ` 
							<div class="basket-product-content">
								<img class="basket-img" src="${content[key].img}"></img>
								<span class="basket-title">${content[key].title}</span>
								<span class="basket-price">${content[key].price}</span>
								<button class="basket-delete">Удалить</button>
								<button class="basket-buy">Заказать</button>
							</div>
						` 
					}
				}	
		}
	
putProduct() // Вызов функции для сохранения товара в корзине

//Close basket
		let buttonClose = document.getElementsByClassName('basket-close');
			for (i = 0; i < buttonClose.length; i++) 
				buttonClose[i].onclick = function() {
				basket.style.display="none";
				}		

}
putProductToBasket();



//A wish list 
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


//Best product
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


//Button show more
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

