let addProduct = document.getElementsByClassName('add-product');
let postContent = document.getElementById('post-content');
let mainContent = document.getElementById("main-content");
for (i = 0 ; i < addProduct.length; i++) 
	addProduct[i].onclick = function() {
			postContent.style.display="flex";
			mainContent.style.display="none";
	}

async function getProduct() {
let response = await fetch ("http://localhost:3000/product");
let content = await response.json();
let recommendations = document.querySelector("#post-product-content");
	for (let key in content) {		 
		recommendations.innerHTML += `
			<div class="product-content"> 
			<img src="${content[key].img}" alt="" class="img-product">
			<span id="product-title">${content[key].title}</span>
		 	<span id="price">${content[key].price}</span>
		 	<button class="button-delete">Удалить</button>
			</div> 
			`
	}
}

getProduct();

let menuProduct = document.getElementsByClassName("menu-product");
for (i = 0; i < menuProduct.length; i++) 
	menuProduct[i].onclick = function() {
	mainContent.style.display="block";
	postContent.style.display="none";
}

//  Add product

let postButton = document.getElementsByClassName("button-post-product");
for (i = 0; i < postButton.length; i++) 
	postButton[i].onclick = function() {
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


// Delete product

let buttonDelete = document.getElementsByClassName("button-delete");
let productContent = document.getElementsByClassName("product-content");
	for (var i = 0; i < buttonDelete.length; i++) 
		buttonDelete[i].onclick = function() {
			deleteProduct();
		}
async function deleteProduct() {
let response = await fetch('http://localhost:3000/product', {
 	method: "DELETE",
 	headers: {
  'Content-type': 'application/json; charset=UTF-8'
 },
})
// ...
		
}

