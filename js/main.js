$(document).ready(function() {
	var timer;

    $(window).bind('scroll', (function() {
		clearTimeout(timer);
		timer = setTimeout(getPercent, 5);
	}))
});

function getPercent() {
	t = $(window).scrollTop();
	p = (t / ($(document).height() - $(window).height())) * 100;
	$(".statusbar").css("width", String(p)+"%");
	if (p > 97) {
		$(".statusbar").css("background-color", "#1ca265");
	} else {
		$(".statusbar").css("background-color", "#eb5e29");
	}
	return;
}