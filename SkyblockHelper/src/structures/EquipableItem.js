
const Item = require('./Item');

class EquipableItem extends Item {
	constructor(data) {
		super(data);

		this.onEquip = data.onEquip;

		this.requireTarget = data.requireTarget;

		this.key = data.key;
	}
}

module.exports = { EquipableItem };