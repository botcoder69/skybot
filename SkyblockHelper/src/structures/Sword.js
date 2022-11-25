
const { EquipableItem } = require('./EquipableItem');

class Sword extends EquipableItem {
	constructor(data) {
		super(data);

		this.group = `Sword`;

		this.sword = data.sword;

		this.swordFunc = data.swordFunc;
	}
}

module.exports = Sword;