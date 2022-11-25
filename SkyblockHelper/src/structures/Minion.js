
const Item = require('./Item');

class Minion extends Item {
	constructor(data) {
		super(data);

		this.group = `Minion`;

		this.produces = data.produces;

		this.emoji = data?.emoji ?? {
			name: {
				placed: ``,
				inventory: ``
			},
			url: {
				placed: ``,
				inventory: ``
			}
		};

		this.tiers = data.tiers;
	}
}

module.exports = Minion;