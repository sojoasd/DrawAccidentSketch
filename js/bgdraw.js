var create_draw = function () {

	var _domName;
	var _svg;

	var _width;
	var _height;

	var _scaleX;
	var _scaleY;
	// var _xAxis;
	// var _yAxis;
	var _Xcount;
	var _Ycount;
	var _yAxisGrid; // 背景格線
	var _xAxisGrid;

	// 建立 svg 區塊
	var create_svg = function () {
		_svg = d3.select(_domName)
			.append("svg")
			.attr({
				"class": 'svgclass',
				"width": _width,
				"height": _height
			})
			.style({
				'border': '0px solid #000',
			});
	};

	var create_scale = function () {
		_scaleX = d3.scale.linear()
			.range([0, _width])
			.domain([0, _width]);
			
		_scaleY = d3.scale.linear()
			.range([_height, 0])
			.domain([_height, 0]);
	};

	// 建立 svg 內各種物件的條件 (但還沒建立)
	var create_svg_frame = function () {
		/* 建立 X 軸的背景線條 */
		_xAxisGrid = d3.svg.axis()
			.scale(_scaleX)
			.orient("bottm")
			.ticks(_Xcount)
			.tickFormat("") // tickFormat 針對每一個刻度的數字，可設定為空值
			.tickSize(-_height, 0);

		/* 建立 Y 軸的背景線條 */
		_yAxisGrid = d3.svg.axis()
			.scale(_scaleY)
			.orient("left")
			.ticks(_Ycount)
			.tickFormat("") // tickFormat 針對每一個刻度的數字，可設定為空值
			.tickSize(-_width, 0);
	};

	var create_XY_Grid = function () {
		_svg.append('g')
			.call(_xAxisGrid)
			.attr({
				'class': 'xAxisGrid',
				'fill': 'none',
				'stroke': 'rgba(0,0,0,.3)',
				'transform': 'translate(' + 0 + ',' + _height + ')'
			});

		_svg.append('g')
			.call(_yAxisGrid)
			.attr({
				'class': 'yAxisGrid',
				'fill': 'none',
				'stroke': 'rgba(0,0,0,.3)',
				'transform': 'translate(' + 0 + ',' + 0 + ')'
			});
	};

	// 更新 Grid 的線條
	var refresh_Grid_line = function () {
		_svg.select('.xAxisGrid')
			.transition()
			.duration(700)
			.attr({ 'transform': 'translate(' + 0 + ',' + _height + ')' })
			.call(_xAxisGrid);

		_svg.select('.yAxisGrid')
			.transition()
			.duration(700)
			.attr({ 'transform': 'translate(' + 0 + ',' + 0 + ')' })
			.call(_yAxisGrid);
	};

	return {
		init: function ($RuleData) {
			// console.log($RuleData);
			_domName = $RuleData.dom;
			_width = $RuleData.width;
			_height = $RuleData.height;
			_Xcount = $RuleData.Xcount;
			_Ycount = $RuleData.Ycount;

			create_svg();
			create_scale();
			create_svg_frame();
			create_XY_Grid();

			// timer = window.setTimeout(function() {
			// 	_width = 1500;
			// 	_height = 1000;
			// 	_svg.style("width", _width).style("height", _height);
			// 	create_svg_frame();
			// 	refresh_Grid_line();
			// }, 1500);
		},
		changes: function (newW, newH, Xcount, Ycount) {
			_width = newW;
			_height = newH;
			_Xcount = Xcount;
			_Ycount = Ycount;

			_svg.attr("width", newW).attr("height", newH);
			create_scale();
			create_svg_frame();
			refresh_Grid_line();
		}
	}
} ();
