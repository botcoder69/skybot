/* eslint-disable no-extend-native */

// Provides extended functionality to Javascript arrays.

Array.prototype.random = function random(amount=1, repeat=false) {
	const usedNumbers = [];
	const res = [];
	while (res.length < amount) {
		const randomizer = Math.floor(Math.random() * this.length);

		if (!repeat) {
			if (!usedNumbers.includes(randomizer)) {
				usedNumbers.push(randomizer);
				res.push(this[randomizer]);
			}
		} else {
			res.push(this[randomizer]);
		}
	} 
	return res;
};

Array.prototype.tap = function tap(fn) {
	fn(this);

	return this;
};

Array.prototype.partition = function partition(fn) {
	const passArray = [];
	const failArray = [];

	for (const element of this) {
		const res = fn(element, this.indexOf(element), this);

		if (res) {
			passArray.push(element);
		} else {
			failArray.push(element);
		}
	}

	return [passArray, failArray];
};

Array.prototype.first = function first(amount=1) {
	if (amount < 0) {
		return this.last(Math.abs(amount));
	} else {
		return this
			.filter((_val, index) => index < amount);
	}
};

Array.prototype.last = function last(amount=1) {
	if (amount < 0) {
		return this.first(Math.abs(amount));
	} else {
		return this
			.reverse()
			.filter((_val, index) => index < amount);
	}
};