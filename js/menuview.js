var PicViewObj = new PicViewModel();
var _tempMenuObj;

var _imgLeft;
var _imgTop;

var _perX = 100;
var SetPer = function(e){
	console.log(e);
	_perX = e;
};

var _typeWHObj = {
	'Car':[0, 0],
	'Person':[0, 0],
	'Road':[0, 0],
	'Sign':[0, 0],
};

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
			PicViewObj.GetPic(imgTypeName, function (data) {
				var Obj;
				switch($menuObj[0].id){
					case "Car":
						Obj = data.Car;
					break;
					
					case "Person":
						Obj = data.Person;
					break;
					
					case "Road":
						Obj = data.Road;
					break;
					
					case "Sign":
						Obj = data.Sign;
					break;
				}
				
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
					// console.log($(e.currentTarget).closest('.menu-content').prev()[0].id);
					var parentImgID = $(this)[0].id;
					var parentImgPath = $(this)[0].attributes.src.value;
					var currentCount = $('.' + parentImgID).length + 1;
					var selfID = parentImgID + currentCount;
					
					var selfClass = parentImgID + " drag-img" + " " + imgTypeName + "-img";
					var currentDragImgCount = $('.drag-img').length + 1;
					$('#DivSvg').append('<img id="' + selfID + '" class="' + selfClass + '" alt="">');
					
					var $newImg = $('#' + selfID);
					$newImg.attr({
						'src':parentImgPath,
						'data-times': 1 * 
					});
					
					var typeName = $(e.currentTarget).closest('.menu-content').prev()[0].id;
					SetTypeNameWH(typeName, $newImg[0].clientWidth, $newImg[0].clientHeight);
					
					var newleft = $newImg[0].clientWidth / 2;
					var newtop = $newImg[0].clientHeight / 2;
					
					// console.log($('#DivSvg'));
					// $newImg.stop().animate({
					// 	left : e.pageX - newleft - $('#DivSvg')[0].offsetLeft, 
					// 	top: e.pageY - newtop - $('#DivSvg')[0].offsetTop, 
					// 	'z-index': currentDragImgCount
					// });
					
					SetPer = function(e){
						_perX = e;
					};
					
					$newImg.css({
						'left' : e.pageX - newleft - $('#DivSvg')[0].offsetLeft, 
						'top': e.pageY - newtop - $('#DivSvg')[0].offsetTop, 
						'z-index': currentDragImgCount,
						'width': $newImg[0].clientWidth * (_perX / 100),
						'height': $newImg[0].clientHeight * (_perX / 100),
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

var SetTypeNameWH = function(typeName, w, h){
	switch(typeName){
		case "Car":
			_typeWHObj.Car = [w, h];
			break;

		case "Person":
			_typeWHObj.Person = [w, h];
			break;

		case "Road":
			_typeWHObj.Road = [w, h];
			break;

		case "Sign":
			_typeWHObj.Sign = [w, h];
			break;
	}
};

var SetTest = function(callback){
	callback(_typeWHObj);
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