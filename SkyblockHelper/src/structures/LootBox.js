
const Item = require('./Item');

class LootBox extends Item {
	constructor(data) {
		super(data);

		this.group = `Loot Box`;

		this.loot = data.loot;

		this.coins = data.coins;
	}
}

module.exports = LootBox;