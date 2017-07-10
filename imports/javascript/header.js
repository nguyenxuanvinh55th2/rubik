function Search(){
	$('.icon-search').click(function() {
		$('.header-top .form-group').addClass('active-search');
	});
}
function removeSearch() {
	var $val =  $(".form-group .form-control");
	$(document).click(function(event){
		if(!$(event.target).is(".form-group *, .form-group .form-control")){
			$val.each(function(index, el) {
				if ($(this).val().length<1) {
					$(this).parents('.form-group').removeClass('active-search');
				}
			});
		}
	});
}
function PinHeader(){
	$(window).scroll(function() {
		if($(window).scrollTop() >0){
			$('#header').addClass('pin-header');
		}
		else{
			$('#header').removeClass('pin-header');
		}
	});
}
function PinTop(){
	var heightWindow = $(window).height();
	$(window).scroll(function() {
		if($(window).scrollTop()>heightWindow){
			$('.pin-top').addClass('active');
		}
		else{
			$('.pin-top').removeClass('active');
		}
	});

	$('.pin-top').click(function() {
		$('html,body').animate({scrollTop: 0}, 700)
	});
}
function showProduct(){
	$('.sec-product').each(function() {
		var heightWindow = $(window).height();
		var heightSecToHeader = $(this).offset().top;
		var heightSec = $(this).find('.box-item').innerHeight();
		var total = heightSecToHeader-heightWindow-heightSec;
		$(window).scroll(function() {
			if($(window).scrollTop()>total){
				$(this).addClass('active');
			}
		}.bind(this));
	});
}
function menuMobile(){
	$('.menu-control').click(function() {
		if($('#header').hasClass('active-menu')){
			$('#header').removeClass('active-menu');
		}
		else{
			$('#header').addClass('active-menu');
		}
	});
}
export {Search}
export {removeSearch}
export {PinHeader}
export {PinTop}
export {showProduct}
export {menuMobile}
