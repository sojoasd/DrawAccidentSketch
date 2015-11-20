var SilderModel = function () {
	
	var _self = this;
	
	_self.$sliderbarDrag;
	_self._sliderbardrag;
	_self._LargerProportionNum;
	
	this.CreateCirclesSlider = function () {
		$('.silder-bar').append('<div class="slider-margin-left"></div><div class="silder-bar-bg"><div class="silder-bar-lines"></div><div class="silder-bar-circles"></div></div><div class="slider-tips"></div>');

		_self.$sliderbarDrag = $('.silder-bar-circles').draggabilly({
			axis: 'x',
			containment: true
		});

		_self._sliderbardrag = _self.$sliderbarDrag.data('draggabilly');

		_self._LargerProportionNum = 900;

		_self.$sliderbarDrag.on('dragMove', function (event, pointer) {
			var $el = $(this).parent().parent().find('.slider-tips');
			$el.css({ 'opacity': 1.0 });
			$el.html(" " + (100 + (_self._sliderbardrag.position.x / 500).toFixed(2) * _self._LargerProportionNum) + " % ");
		});
	};

	this.circlesSlider = function (callback) {
		_self.$sliderbarDrag.on('dragMove', function (event, pointer) {
			var $el = $(this).parent().parent().find('.slider-tips');
			$el.css({ 'opacity': 1.0 });
			$el.html(" " + (100 + (_self._sliderbardrag.position.x / 500).toFixed(2) * _self._LargerProportionNum) + " % ");
			callback((100 + (_self._sliderbardrag.position.x / 500).toFixed(2) * _self._LargerProportionNum));
		});

		$('.silder-bar-circles').on({
			mouseleave: function () {
				var $el = $(this).parent().parent().find('.slider-tips');
				$el.css({ 'opacity': 0.0 });
			},
			mouseover: function () {
				var $el = $(this).parent().parent().find('.slider-tips');
				$el.css({ 'opacity': 1.0 });
				$el.html(" " + (100 + (_self._sliderbardrag.position.x / 500).toFixed(2) * _self._LargerProportionNum) + " % ");
				$('.silder-bar').data("percents", { perX: (100 + (_self._sliderbardrag.position.x / 500).toFixed(2) * _self._LargerProportionNum) });
				callback((100 + (_self._sliderbardrag.position.x / 500).toFixed(2) * _self._LargerProportionNum)); 
				//因為 $('.silder-bar-lines').on() 事件結束後，球會跑到目的地，再觸發 mouseover 事件，就會回傳數值
			}
		});

		$('.silder-bar-lines').on({
			click: function (e) {
				var nowX = _self._sliderbardrag.position.x;
				var goalX = e.offsetX;
				var moveLeft = goalX - nowX;
				var circleWidth = $('.silder-bar-circles')[0].clientWidth / 2;
				_self._sliderbardrag.position.x = goalX;
				$('.silder-bar-circles').css({ 'left': nowX + moveLeft - circleWidth });

				var $el = $(this).parent().parent().find('.slider-tips');
				$el.css({ 'opacity': 1.0 });
				$el.html(" " + _self._sliderbardrag.position.x + " % ");
			}
		});
	}
};

