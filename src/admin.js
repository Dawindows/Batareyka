let addProduct = document.getElementsByClassName('add-product');
let postContent = document.getElementById('post-content');
let mainContent = document.getElementById("main-content");
for (i = 0 ; i < addProduct.length; i++) 
	addProduct[i].onclick = function() {
			postContent.style.display="flex";
			mainContent.style.display="none";
			changeContent.style.display="none";
	}

//Вывод товара в меню и запросы PUT, Delete
async function getProduct() {
	let response = await fetch ("http://localhost:3000/product");
	let content = await response.json();
	let recommendations = document.querySelector("#post-product-content");
	for (let key in content) {
		recommendations.innerHTML += `
			<div class="product-content"> 
			<img src="${content[key].img}" alt="" class="img-product" data-url="${content[key].img}">
			<span id="product-title">${content[key].title}</span>
		 	<span id="price">${content[key].price}</span>
		 	<button class="button-delete" data-id="${content[key].id}">Удалить</button>
		 	<button class="button-change"  data-id="${content[key].id}">Изменить</button>
			</div> 
			`
	}

// Delete product
	let buttonDelete = document.getElementsByClassName("button-delete"); // ***
	let productContent = document.getElementsByClassName("product-content");
		for (let i = 0; i < buttonDelete.length; i++) 
			buttonDelete[i].onclick =  async function() {
				let itemId = this.getAttribute('data-id');
				let confir = confirm("Удалить товар?") 
					if(confir == true) {
						let response = await fetch('http://localhost:3000/product/' + itemId, {
 							method: "DELETE",
 							headers: {
  							'Content-type': 'application/json; charset=UTF-8'
 							},
						}) 
						.then(response => response.json())
						window.location.reload();
					}
			}

// Change product 
	let buttonChange = document.getElementsByClassName("button-change");
	let changeContent = document.querySelector("#change-content");
	for (let i = 0; i < buttonChange.length; i++) 
		buttonChange[i].onclick = function() {
			let itemId = this.getAttribute('data-id');
			mainContent.style.display="none";
			changeContent.style.display="flex";
				for (let key in content) {
					if (itemId === `${content[key].id}`) { 
						changeContent.innerHTML += `
							<div class="post-product">
            				<span>Название товара:</span>
            				<input id="change-title" type="text" value="${content[key].title}" >
            				<span>Фото:</span>
        				    <input id="change-img" type="file" name="mURL" >
           					<span>Стоимость:</span>
          					<input id="change-price" type="text" value="${content[key].price}">
            				<span>Описанние:</span>
            				<textarea id="change-description" name="comment">${content[key].description}</textarea>
            				<div>
                			<button class="button-put-product">Изменить</button>
           					</div>
       						</div>
						`
					}
				}	
		
//save modified product
			const buttonChangeIt = document.getElementsByClassName("button-put-product");
				for (let i = 0; i < buttonChangeIt.length; i++) 
					buttonChangeIt[i].onclick = function() {
					putProduct();
				}

			async function putProduct() {
				let response = await fetch('http://localhost:3000/product/' + itemId, {
 					method: "PUT",
    				headers: {
      					Accept: 'application/json',
      					'Content-Type': 'application/json',
    				},
    				body:  JSON.stringify({ 
    				img: ('assets/product/' + document.getElementById("change-img").files[0].name),
      				title: (document.getElementById('change-title').value),
      				price: (document.getElementById('change-price').value),
      				description: (document.getElementById('change-description').value)
    				}),
 				})
				window.location.reload();
			}

		}
}
getProduct();


let menuProduct = document.getElementsByClassName("menu-product");
let changeContent = document.querySelector("#change-content");
for (i = 0; i < menuProduct.length; i++) 
	menuProduct[i].onclick = function() {
	mainContent.style.display="block";
	postContent.style.display="none";
	changeContent.style.display="none";
}

//  Add product
let postButton = document.getElementsByClassName("button-post-product");
for (i = 0; i < postButton.length; i++) 
	postButton[i].onclick = function() {
	mainContent.style.display="none";
	postProduct();
}

async function postProduct() {
	let response = await fetch('http://localhost:3000/product', {
 		method: "POST",
    	headers: {
      		Accept: 'application/json',
      		'Content-Type': 'application/json',
    	},
    	body:  JSON.stringify({
      	img: ('assets/product/' + document.getElementById("product-img").files[0].name), 
      	title: (document.getElementById('product-title').value),
      	price: (document.getElementById('product-price').value),
      	description: (document.getElementById('product-description').value)
    	}),
 	})
window.location.reload();
}