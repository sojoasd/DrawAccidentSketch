var create_draw = function() {

	var _domName;
	var _svg;

	var _width;
	var _height;

	var _scaleX;
	var _scaleY;
	var _xAxis;
	var _yAxis;
	var _Xcount;
	var _Ycount;
	var _yAxisGrid; // 背景格線
	var _xAxisGrid;

	// 建立 svg 區塊
	var create_svg = function() {
		_svg = d3.select(_domName)
			.append("svg")
			.attr({
				"class": 'svgclass',
				"width": _width,
				"height": _height
			})
			.style({
				'border': '1px solid #000'
			});
	};

	var create_scale = function() {
		_scaleX = d3.scale.linear()
			.range([0, _width])
			.domain([0, _width]);

		_scaleY = d3.scale.linear()
			.range([_height, 0])
			.domain([_height, 0]);
	};

	// 建立 svg 內各種物件的條件 (但還沒建立)
	var create_svg_frame = function() {
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

	var create_XY_Grid = function() {
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

	return {
		init: function($RuleData) {
			_domName = $RuleData.dom;
			_width = $RuleData.width;
			_height = $RuleData.height;
			_Xcount = $RuleData.Xcount;
			_Ycount = $RuleData.Ycount;

			create_svg(_domName);
			create_scale();
			create_svg_frame();
			create_XY_Grid();
		}
	}
}();