
const Item = require('./Item');

class MinionUpgrade extends Item {
	constructor(data) {
		super(data); 

		this.group = 'Minion Upgrade';

		this.minionUpgrade = data.minionUpgrade;
	}
}

module.exports = MinionUpgrade;