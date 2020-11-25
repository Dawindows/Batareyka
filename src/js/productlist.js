// Product list
const main = document.getElementById("content");
const product = document.getElementById("product");
const productListNotebook = document.getElementById("product-list-notebook");
const productListPhone = document.getElementById("product-list-phone");
const productListAccessories = document.getElementById("product-list-accessories");
const productListTv = document.getElementById("product-list-tv");
//nav-menu
const notebook = document.getElementById("notebook").addEventListener("click", function() {
	product.style.display = "flex";
	main.style.display = "none";
	productListNotebook.style.display = "block";
	productListPhone.style.display = "none";
	productListAccessories.style.display = "none";
	productListTv.style.display = "none";
});
const phone = document.getElementById("phone").addEventListener("click", function() {
	product.style.display = "flex";
	main.style.display = "none";
	productListNotebook.style.display = "none";
	productListPhone.style.display = "block";
	productListAccessories.style.display = "none";
	productListTv.style.display = "none";
});
const accessories = document.getElementById("accessories").addEventListener("click", function() {
	product.style.display = "flex";
	main.style.display = "none";
	productListNotebook.style.display = "none";
	productListPhone.style.display = "none";
	productListAccessories.style.display = "block";
	productListTv.style.display = "none";
});
const tv = document.getElementById("tv").addEventListener("click", function() {
	product.style.display = "flex";
	main.style.display = "none";
	productListNotebook.style.display = "none";
	productListPhone.style.display = "none";
	productListAccessories.style.display = "none";
	productListTv.style.display = "block";
});

async function productListNotebookF() {
	const response = await fetch("http://localhost:3000/product");
	const content = await response.json();
	content.forEach(function(item, key, content) {
		if ("Ноутбук" == `${content[key].type}`) {
			productListNotebook.innerHTML += `
						<div id="product-content"> 
							<img src="${content[key].img}" alt="" class="img-product">
							<span id="product-title" >${content[key].title}</span>
		 					<span id="price">${content[key].price} $</span> 
		  					<div class="menu-product"> 
		  						<button class="button-basket" data-id="${content[key].id}">В корзину</button>
		  						<div class="icon-favorite">
		  						<i class="far fa-heart"></i>
							</div> 	
						 </div> 
						`
		}
	});
};
productListNotebookF()

async function productListPhoneF() {
	const response = await fetch("http://localhost:3000/product");
	const content = await response.json();
	content.forEach(function(item, key, content) {
		if ("Смартфон" == `${content[key].type}`) {
			productListPhone.innerHTML += `
						<div id="product-content"> 
							<img src="${content[key].img}" alt="" class="img-product">
							<span id="product-title" >${content[key].title}</span>
		 					<span id="price">${content[key].price} $</span> 
		  					<div class="menu-product"> 
		  						<button class="button-basket" data-id="${content[key].id}">В корзину</button>
		  						<div class="icon-favorite">
		  						<i class="far fa-heart"></i>
							</div> 	
						 </div> 
						`
		}
	});
};
productListPhoneF()

async function productListAccessoriesF() {
	const response = await fetch("http://localhost:3000/product");
	const content = await response.json();
	content.forEach(function(item, key, content) {
		if ("Аксессуар" == `${content[key].type}`) {
			productListAccessories.innerHTML += `
				<div id="product-content"> 
					<img src="${content[key].img}" alt="" class="img-product">
					<span id="product-title" >${content[key].title}</span>
		 			<span id="price">${content[key].price} $</span> 
		  			<div class="menu-product"> 
		  				<button class="button-basket" data-id="${content[key].id}">В корзину</button>
		  				<div class="icon-favorite">
		  				<i class="far fa-heart"></i>
					</div> 	
				 </div> 
			`
		}
	});
};
productListAccessoriesF()

async function productListTvF() {
	const response = await fetch("http://localhost:3000/product");
	const content = await response.json();
	content.forEach(function(item, key, content) {
		if ("Телевизор" == `${content[key].type}`) {
			productListTv.innerHTML += `
				<div id="product-content"> 
					<img src="${content[key].img}" alt="" class="img-product">
					<span id="product-title" >${content[key].title}</span>
		 			<span id="price">${content[key].price} $</span> 
		  			<div class="menu-product"> 
		  				<button class="button-basket" data-id="${content[key].id}">В корзину</button>
		  				<div class="icon-favorite">
		  				<i class="far fa-heart"></i>
					</div> 	
				 </div> 
			`
		}
	});
};
productListTvF()

// price corrector
function minMaxPrice() {
	let rmin = document.getElementById('rmin').value;
	let rmax = document.getElementById('rmax').value;
	let tmin = document.getElementById('tmin');
	let tmax = document.getElementById('tmax');
	tmin.value = rmin;
	tmax.value = rmax;
};