
$('.silder-bar').data("percents", { perX: 100 });

$('.silder-bar').append('<div class="slider-margin-left"></div><div class="silder-bar-bg"><div class="silder-bar-lines"></div><div class="silder-bar-circles"></div></div><div class="slider-tips"></div>');

var $sliderbarDrag = $('.silder-bar-circles').draggabilly({
	axis: 'x',
	containment: true
});

var _sliderbardrag = $sliderbarDrag.data('draggabilly');

$sliderbarDrag.on('dragMove', function (event, pointer) {
	var $el = $(this).parent().parent().find('.slider-tips');
	$el.css({ 'opacity': 1.0 });
	$el.html(" " + (100 + (_sliderbardrag.position.x / 500).toFixed(2) * 100) + " % ");
});

$('.silder-bar-circles').on({
	mouseleave: function () {
		var $el = $(this).parent().parent().find('.slider-tips');
		$el.css({ 'opacity': 0.0 });
	},
	mouseover: function () {
		var $el = $(this).parent().parent().find('.slider-tips');
		$el.css({ 'opacity': 1.0 });
		$el.html(" " + (100 + (_sliderbardrag.position.x / 500).toFixed(2) * 100) + " % ");
		$('.silder-bar').data("percents", { perX: (100 + (_sliderbardrag.position.x / 500).toFixed(2) * 100) });
	}
});

$('.silder-bar-lines').on({
	click: function (e) {
		var nowX = _sliderbardrag.position.x;
		var goalX = e.offsetX;
		var moveLeft = goalX - nowX;
		_sliderbardrag.position.x = goalX;
		$('.silder-bar-circles').css({ 'left': nowX + moveLeft });

		var $el = $(this).parent().parent().find('.slider-tips');
		$el.css({ 'opacity': 1.0 });
		$el.html(" " + _sliderbardrag.position.x + " % ");
	}
});

