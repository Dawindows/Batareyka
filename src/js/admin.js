//Entrance to AddProduct menu
const changeContent = document.getElementById("change-content");
const postContent = document.getElementById('post-content');
const mainContent = document.getElementById("main-content");
const addProduct = document.querySelector('.add-product').onclick = function() {
    postContent.style.display = "flex";
    mainContent.style.display = "none";
    changeContent.style.display = "none";
};

//Get product
async function getProduct() {
    const response = await fetch("http://localhost:3000/product");
    const content = await response.json();
    const productlist = document.querySelector("#post-product-content");
    content.forEach(function(item, key, content) {
        productlist.innerHTML += `
			<div class="product-content"> 
			 	<img src="${content[key].img}" alt="" class="img-product" data-url="${content[key].img}">
			  	<span id="product-title">${content[key].title}</span>
			    <span id="price">${content[key].price}</span>
			    <button class="button-delete" data-id="${content[key].id}">Удалить</button>
			    <button class="button-change"  data-id="${content[key].id}">Изменить</button>
			</div> 
		`
    });
};
getProduct();

// Delete product
async function DeleteProduct() {
    const response = await fetch("http://localhost:3000/product");
    const content = await response.json();
    const buttonDelete = document.querySelectorAll(".button-delete");
    const productContent = document.getElementsByClassName("product-content");
    buttonDelete.forEach(function(item, i, buttonDelete) {
        buttonDelete[i].onclick = async function() {
            let itemId = this.getAttribute('data-id');
            let confir = confirm("Удалить товар?")
	            if (confir == true) {
	                let response = await fetch('http://localhost:3000/product/' + itemId, {
	                    ethod: "DELETE",
	                    headers: {
	                        'Content-type': 'application/json; charset=UTF-8'
	                    },
	                }).then(response => response.json())
	                window.location.reload();
	            }
        };
    });
};
DeleteProduct()

// Change product 
async function ChangeProduct() {
    const response = await fetch("http://localhost:3000/product");
    const content = await response.json();
    const changeContent = document.querySelector("#change-content");
    const buttonChange = document.querySelectorAll(".button-change");
    buttonChange.forEach(function(item, i, buttonChange) {
        buttonChange[i].onclick = function() {
            let itemId = this.getAttribute('data-id');
            mainContent.style.display = "none";
            changeContent.style.display = "flex";
            content.forEach(function(item, key, content) {
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
                };
                const buttonChangeIt = document.querySelector('.button-put-product').onclick = function() {
                    putProduct();
                };
//Save modified product
				async function putProduct() {
				    let response = await fetch('http://localhost:3000/product/' + itemId, {
				        method: "PUT",
				        headers: {
				            Accept: 'application/json',
				            'Content-Type': 'application/json',
				        },
				        body: JSON.stringify({
				            img: ('assets/product/' + document.getElementById("change-img").files[0].name),
				            title: (document.getElementById('change-title').value),
				            price: (document.getElementById('change-price').value),
				            description: (document.getElementById('change-description').value)
				        }),
				    });
				    window.location.reload();
				};
            });
        };
    });
};
ChangeProduct()
 
// Etrance to product list
const menuProduct = document.querySelector(".menu-product").onclick = function() {
    mainContent.style.display = "block";
    postContent.style.display = "none";
    changeContent.style.display = "none";
};

//  Add product
const postButton = document.querySelector(".button-post-product").onclick = function() {
    mainContent.style.display = "none";
    postProduct();
};

// day when the product was saved
function day() {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    return (year + "" + month + "" + day);
};

// Add new product to json-server
async function postProduct() {
    const response = await fetch('http://localhost:3000/product', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            img: ('assets/product/' + document.getElementById("product-img").files[0].name),
            title: (document.getElementById('product-title').value),
            price: (document.getElementById('product-price').value),
            description: (document.getElementById('product-description').value),
            date: (day()),
            type: (selectProduct())
        }),
    });
    window.location.reload();
};

// Select type of product
function selectProduct() {
    const selectProduct = document.querySelector("#select-product")
    let selectedOption = selectProduct.options[selectProduct.selectedIndex].innerHTML
    return selectedOption;
};