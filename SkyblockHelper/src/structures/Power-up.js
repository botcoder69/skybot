
const { EquipableItem } = require('./EquipableItem');

class PowerUp extends EquipableItem {
	constructor(data) {
		super(data);

		this.group = `Power-up`;
	}
}

module.exports = PowerUp;