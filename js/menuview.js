var PicViewObj = new PicViewModel();
var _tempMenuObj;

var _imgW;
var _imgH;
var _imgLeft;
var _imgTop;

$('.dropdown-menu > li > a').on({
	click: function (e) {
		var imgTypeName = e.currentTarget.title;
		
		if (_tempMenuObj !== this) {
			$('.dropdown-menu > li a').removeClass('add-bridge');
			_tempMenuObj = this;
			$(this).toggleClass('add-bridge');
			$('.menu-content').remove();

			$(this).after('<div class="menu-content"></div>');
			$('.menu-content').css({'margin-top': -(e.pageY / 2)}); //這個目前 menu 項目太少，還看不出來有問題
			
			var $menuObj = $(this);
			PicViewObj.GetPic(imgTypeName, function (Obj) {
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
					var parentImgID = $(this)[0].id;
					var parentImgPath = $(this)[0].attributes.src.value;
					var currentCount = $('.' + parentImgID).length + 1;
					var selfID = parentImgID + currentCount;
					
					var selfClass = parentImgID + " drag-img" + " " + imgTypeName + "-img";
					var currentDragImgCount = $('.drag-img').length + 1;
					$('#DivSvg').append('<img id="' + selfID + '" class="' + selfClass + '" alt="">');
					
					var $newImg = $('#' + selfID);
					$newImg.attr({'src':parentImgPath});
					var newleft = $newImg[0].clientWidth / 2;
					var newtop = $newImg[0].clientHeight / 2;
					_imgW = $newImg[0].clientWidth;
					_imgH = $newImg[0].clientHeight;
					// console.log($('#DivSvg'));
					// $newImg.stop().animate({
					// 	left : e.pageX - newleft - $('#DivSvg')[0].offsetLeft, 
					// 	top: e.pageY - newtop - $('#DivSvg')[0].offsetTop, 
					// 	'z-index': currentDragImgCount
					// });
					$newImg.css({
						left : e.pageX - newleft - $('#DivSvg')[0].offsetLeft, 
						top: e.pageY - newtop - $('#DivSvg')[0].offsetTop, 
						'z-index': currentDragImgCount
					});
					$newImg.draggabilly();
					$newImg.on({
						pointerDown: function (event, pointer) {
							$('#DivSvg').draggabilly('disable');
						}
					});
					
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

var SetTest = function(callback){
	callback({'imgW': _imgW, 'imgH': _imgH});
};

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