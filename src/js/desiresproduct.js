const desires = document.getElementById('favorite');	
const iconFavorite = document.querySelector('.icon-heart').onclick = function() {
	desires.style.display="flex";
};
const favoriteClose = document.querySelector('.favorite-close').onclick = function() {
	desires.style.display="none";
};
