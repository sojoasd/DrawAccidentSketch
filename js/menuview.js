var PicViewObj = new PicViewModel();
var _tempMenuObj;

$('.dropdown-menu > li > a').on({
	click: function (e) {
		if (_tempMenuObj !== this) {
			$('.dropdown-menu > li a').removeClass('add-bridge');
			_tempMenuObj = this;
			$(this).toggleClass('add-bridge');
			$('.menu-content').remove();

			$(this).after('<div class="menu-content"></div>');
			// $('.menu-content').css({
			// 	'z-index': '99999998',
			// 	// 'width': '100%', // 用 screen width 去大概算出一列可以放幾個
			// 	'height': '500px',
			// 	'background': 'silver',
			// 	'position': 'absolute',
			// 	'margin-top': '-40px', //.dropdown-menu > li > a 的 CSS
			// 	'left': '200%',
			// 	'display': 'block'
			// });
			
			var $menuObj = $(this);
			
			PicViewObj.GetPic(function (Obj) {
				var HtmlTabTitleString = "";
				var HtmlTabContentString = "";
				HtmlTabTitleString += '<ul class="nav nav-tabs" role="tablist">';
				HtmlTabContentString += '<div class="tab-content">';

				var keyCount = 0;
				$.each(Obj, function (key) {
					HtmlTabTitleString += '<li><a href="#' + key + '" aria-controls="' + key + '" role="tab" data-toggle="tab">' + key + '</a></li>';
					HtmlTabContentString += '<div class="tab-pane" id="' + key + '"></div>';
					keyCount += 1;
				});

				HtmlTabContentString += '</div>';
				HtmlTabTitleString += '</ul>';

				$('.menu-content').append(HtmlTabTitleString);
				$('.menu-content').append(HtmlTabContentString);
				$('.menu-content').find('ul > li').eq(0).toggleClass('active');
				var activeID = "#" + $('.menu-content').find('ul > li').eq(0)[0].textContent;
				$(activeID).addClass('active');
				
				$('.menu-content').find('.nav-tabs').css({ 'width': screen.width * (3 / 4) + 'px' });

				$.each(Obj, function (key, objs) {
					$.each(objs, function(index, value){
						$('#' + key).append('<div class="imgstyle"><img id="' + index + '" src="' + value + '" alt=""></div>');
					});
				});

				$('.imgstyle img').click(function (e) {
					console.log(e);					
					// console.log($(this)[0].attributes.src.value);
					var parentImgID = $(this)[0].id;
					var parentImgPath = $(this)[0].attributes.src.value;
					var currentCount = $('.' + parentImgID).length + 1;
					var selfID = parentImgID + currentCount;
					var selfClass = parentImgID + " drag-img";
					var currentDragImgCount = $('.drag-img').length + 1;
					$('body').append('<img class="' + selfClass + '" id="' + selfID +  + '" src="' + parentImgPath + '" alt="">');
					// $('#' + selfID).css({left:e.pageX, top:e.pageY});
					_tempMenuObj = null;
					$('.menu-content').remove();
					$menuObj.removeClass('add-bridge');
				});
			});
		}
		else {
			_tempMenuObj = null;
			$('.menu-content').remove();
			$(this).removeClass('add-bridge');
		}
	}
});

$('.show-on-hover').hover(function () {
	$('.menu-content').remove();
	$('.dropdown-menu > li').find('a').removeClass('add-bridge');
});

$('.menu-content').on('mouseleave', function () {
	_tempMenuObj = null;
});

$('.menu-bridge').on('mouseleave', function () {
	_tempMenuObj = null;
	// $('.dropdown-menu > li').find('a').removeClass('add-bridge');
});