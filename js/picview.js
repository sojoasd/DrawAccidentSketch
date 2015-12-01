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
		
		var PersonArr = {
			'man': {
				'person1':'img/person/person1.png',
				'person2':'img/person/person2.png',
				'person3':'img/person/person3.png',
			},
			'felman': {
				'person4':'img/person/person4.png',
				'person5':'img/person/person5.png',
			},
		};
		
		var RoadArr = {
			'directly': {
				'road1':'img/road/road1.png',
			},
		};
		
		var SignArr = {
			'notice': {
				'sign1':'img/sign/sign1.png',
				'sign2':'img/sign/sign2.png',
				'sign3':'img/sign/sign3.png',
			},
		};
		
		var AllObj = {
			'Car': CarArr,
			'Person': PersonArr,
			'Road': RoadArr,
			'Sign': SignArr,
		};

		callback(AllObj);
	};
};