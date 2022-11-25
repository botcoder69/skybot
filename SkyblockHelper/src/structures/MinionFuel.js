
const Item = require('./Item');

class MinionFuel extends Item {
	constructor(data) {
		super(data);

		this.group = `Minion Fuel`;

		this.minionFuel = data.minionFuel;
	}
}

module.exports = MinionFuel;