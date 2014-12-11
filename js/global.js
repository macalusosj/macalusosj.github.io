$(document).on('click', 'a.ac-NavAnchor', function(){
	//var target = $(this);
	var hash = this.hash;
	var destination = $(hash).offset().top;

	stopAnimatedScroll();

	$('html, body').stop().animate({
		scrollTop: destination
	}, 400, function() { window.location.hash = hash; });
	return false;
});

function stopAnimatedScroll(){
	if ( $('*:animated').length > 0 ) { $('*:animated').stop(); }
}
if(window.addEventListener) {
    document.addEventListener('DOMMouseScroll', stopAnimatedScroll, false);
}
document.onmousewheel = stopAnimatedScroll;
