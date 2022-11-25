
const { EquipableItem } = require('./EquipableItem');

class Armor extends EquipableItem {
	constructor(data) {
		super(data);

		this.group = 'Armor';

		this.armor = data?.armor ?? {};
	}
}

module.exports = Armor;