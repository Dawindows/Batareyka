//entering and exiting the basket
const basket = document.getElementById('basket'); // basket
const basketProduct = document.getElementById("basket-product"); // content  basket
const iconBasket = document.getElementById('icon-basket').addEventListener('click', function() { // button etrance to basket
	basket.style.display = "flex";
});
const buttonClose = document.getElementById('basket-close').addEventListener('click', function() { //Close basket
	basket.style.display = "none";
});

// Basket
async function putProductToBasket() { //function for call to server
	const response = await fetch("http://localhost:3000/product");
	const content = await response.json();
		if (getItem() == undefined || null) { // if in basket undefined product
			basketProduct.innerHTML += ` 
				<span class="empty-basket"> В корзине пусто</span>
			`
			basketProduct.style.height = "80px"
		};
// event of clicking on the button to the basket
	const buttonBasket = document.querySelectorAll(".button-basket");
	buttonBasket.forEach(function(item, i, buttonBasket) {
		buttonBasket[i].onclick = function() {
			let itemId = new Array;
			itemId = this.getAttribute('data-id');
			let currentCartState = [getItem()] || [];
			currentCartState.push(JSON.stringify(itemId));
			localStorage.setItem("cartState", currentCartState);
			window.location.reload();
		};
	});
};
putProductToBasket();

function getItem() { // function to get product in localStorge
	return localStorage.getItem("cartState");
}

//Add product to basket
async function putProduct() {
	const totalCheckbox = document.getElementsByName("Sum");
	const response = await fetch("http://localhost:3000/product");
	const content = await response.json();
	const allProduct = getItem();
		if (allProduct != null) {
			for (let i = 0; i < allProduct.length; i++) {
				let productId = allProduct[i];
				content.forEach(function(item, key, content) {
					if (productId == `${content[key].id}`) {
						basketProduct.innerHTML += ` 
							<div class="basket-product-content">
								<div class="delete-of-product">
									<button class="button-delete-of-product" delete-product-id="${content[key].id}"><i class="far fa-times-circle"></i></button>
								</div>
								<div class="first-row">
									<img class="basket-img" src="${content[key].img}"></img>
									<span class="basket-title">${content[key].title}</span>
								</div>
								<div class="add-item-quantity">
									<button class="add-item-quantity-minus"><i class="fas fa-minus"></i></button>
									<input type="text" id="add-item-quantity-number" value="1"></input>
									<button class="add-item-quantity-pluse"><i class="fas fa-plus"></i></button>
								</div>
								<div class="second-row">
									<span class="basket-price">${content[key].price} $</span>
									<input type="checkbox" value="${content[key].price}" class="checkbox-price"></input>
								</div>
							</div>		
						`
					};
				});
			};
		};
// delete product in basket

}; //close function putProduct()
putProduct() // call function 

//total sum product 
document.onchange = function() {
		const checkbox = document.querySelectorAll('.checkbox-price');
		let total = new Number;
		checkbox.forEach(function(item, j, checkbox) {
			if (checkbox[j].checked) {
				total += parseFloat(checkbox[j].value);
			}
			document.getElementById('outcome').innerHTML = 'Итог: ' + total + ' $';
		});
	};

// send order
const order = document.getElementById("button-price-of-product").onclick = function orderFunction() {
	alert('Заказ оформлен')
	localStorage.removeItem("cartState");
	window.location.reload();
};


