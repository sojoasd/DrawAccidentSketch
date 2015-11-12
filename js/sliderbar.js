
$('.silder-bar').append('<div class="silder-bar-bg"><div class="silder-bar-lines"></div><div class="silder-bar-circles"></div></div><div class="slider-tips"></div>');

var $draggable = $('.silder-bar-circles').draggabilly({
	axis: 'x',
	containment: true
});

var draggie = $draggable.data('draggabilly');

var _circlesTimer;
$('.silder-bar-circles').on({
	mousedown: function () {
		var $el = $(this).parent().parent().find('.slider-tips');
		$el.html(" " + (100 + (draggie.position.x / 500).toFixed(2) * 100) + " % ");
		$el.css({ 'opacity': 1.0 });
		$el.show();
	},
	mouseover: function () {
		var $el = $(this).parent().parent().find('.slider-tips');
		$el.html(" " + (100 + (draggie.position.x / 500).toFixed(2) * 100) + " % ");
		$el.css({ 'opacity': 1.0 });
		$el.show();
		$('.silder-bar').data("percents", { perX: (100 + (draggie.position.x / 500).toFixed(2) * 100) });
	},
	mouseleave: function () {
		window.clearTimeout(_circlesTimer);
		var $el = $(this).parent().parent().find('.slider-tips');
		$el.html(" " + (100 + (draggie.position.x / 500).toFixed(2) * 100) + " % ");
		_circlesTimer = window.setTimeout(function () {
			$el.fadeTo(1000, 0.0, function () { $el.hide(); });
		}, 3000);
	},
});

$('.silder-bar-lines').on({
	click: function (e) {
		var nowX = draggie.position.x;
		var goalX = e.offsetX;
		var moveLeft = goalX - nowX; 
		draggie.position.x = goalX;
		$('.silder-bar-circles').css({ 'left': nowX + moveLeft });
	}
});