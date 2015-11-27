var PicViewModel = function () {

	var _self = this;

	this.GetPic = function (imgTypeName, callback) {
		
		var CarArr = {
			'van': {
				'car1':'img/car/car1.png',
				'car3':'img/car/car3.png',
				'car4':'img/car/car4.png',
			},
			'truck': {
				'car5':'img/car/car5.png',
			},
			'freight': {
				'car6':'img/car/car6.png',
				'car8':'img/car/car8.png',
			},
			'bus': {
				'car7':'img/car/car7.png',
			},
		};

		callback(CarArr);
	};
};