//Entrance to your account
const contentUser = document.getElementById('user');
const button = document.querySelector('.user').onclick = function() {
    contentUser.style.display = "flex";
};
const close = document.querySelector(".button-close").onclick = function() {
    contentUser.style.display = "none";
};

//Admin
async function getAdmin() {
    const response = await fetch("http://localhost:3000/admin");
    const content = await response.json();
    content.forEach(function(item, key, content) {
        if (document.getElementById("password").value == content[key].password && document.getElementById("login").value == content[key].login && content[key].isAdmin == true) {
            document.location.href = "admin.html";
            alert("Вы вошли как админ");
        }
        else if (document.getElementById("password").value == content[key].password && document.getElementById("login").value == content[key].login) {
            document.location.href = "index.html";
            alert("Вы вошли как покупатель");
        }
    });
};

//registration
async function postAdmin() {
    const response = await fetch("http://localhost:3000/admin", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: (document.getElementById("login").value),
            password: (document.getElementById("password").value)
        }),
    })
    alert("Вы успешно зарегистрировались");
    window.location.reload();
};

// button registration
const buttonRegistration = document.querySelector('.registration').onclick = function() {
    postAdmin();
};

//Button enter
const buttonEntrance = document.querySelector('.access').onclick = function() {
    getAdmin();
};

// Product Content
//Menu new Product
function date() {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return (year + "" + month + "" + day);
};

// product list
async function getProduct() {
    const response = await fetch("http://localhost:3000/product");
    const content = await response.json();
    const recommendations = document.querySelector("#recommendations-product-content");
    const news = document.querySelector("#new-product-content");
    const sale = document.querySelector("#sale-product-content");
    content.forEach(function(item, key, content) {
        recommendations.innerHTML += `		
				<div id="product-content">
					<img src="${content[key].img}" alt="" class="img-product">
	 				<span id="product-title">${content[key].title}</span>
	 				<span id="price">${content[key].price} $</span> 
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
			 	<span id="price">${content[key].price} $</span> 
			  		<div class="menu-product"> 
			  			<button class="button-basket" data-id="${content[key].id}">В корзину</button>
			  			<div class="icon-favorite">
			  			<i class="far fa-heart"></i>
					</div> 	
			 </div> 
			`
        if (`${content[key].date}` - date() <= 7) {
            news.innerHTML += `
				<div id="product-content"> 
				<div class="new-block">New</div>
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
}
getProduct();

//Start change product list
const recommendationsProduct = document.getElementById("recommendations-product");
const newProduct = document.getElementById("new-product");
const saleProduct = document.getElementById("sale-product");
const topRecommendations = document.querySelector(".top-recommendations").onclick = function() {
    recommendationsProduct.style.display = "flex";
    newProduct.style.display = "none";
    saleProduct.style.display = "none";
};
const topNew = document.querySelector(".top-new").onclick = function() {
    newProduct.style.display = "flex";
    recommendationsProduct.style.display = "none";
    saleProduct.style.display = "none";
};
const topSale = document.querySelector(".top-sale").onclick = function() {
    saleProduct.style.display = "flex";
    recommendationsProduct.style.display = "none";
    newProduct.style.display = "none";
};

//Button show more
let news = 0;
let sale = 0;
let recommendations = 0;
//content
const recommendationsContent = document.getElementById("recommendations-product-content");
const newContent = document.getElementById("new-product-content");
const saleContent = document.getElementById("sale-product-content");
//button
const allNew = document.querySelector(".all-new").onclick = function() {
    if (news % 2 == 0) {
        newContent.style.height = "auto";
    }
    if (news % 2 != 0) {
        newContent.style.height = "336px";
    }
    news++;
};
const allRecommendations = document.querySelector(".all-recommendations").onclick = function() {
    if (recommendations % 2 == 0) {
        recommendationsContent.style.height = "auto";
    }
    if (recommendations % 2 != 0) {
        recommendationsContent.style.height = "336px";
    }
    recommendations++;
};
const allSale = document.querySelector(".all-sale").onclick = function() {
    if (sale % 2 == 0) {
        saleContent.style.height = "auto";
    }
    if (sale % 2 != 0) {
        saleContent.style.height = "336px";
    }
    sale++;
};
// Slide
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
};

function currentSlide(n) {
    showSlides(slideIndex = n);
};

function showSlides(n) {
    const slides = document.querySelectorAll(".holiday-img");
    const dots = document.querySelectorAll(".dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    slides.forEach(function(item, i) {
        slides[i].style.display = "none";
    })
    dots.forEach(function(item, i) {
        dots[i].className = dots[i].className.replace(" active", "");
    })
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
};