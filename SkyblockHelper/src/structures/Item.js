
const { BaseItem } = require('./BaseItem');

class Item extends BaseItem {
	/**
	 * Creates a Skybot Item.
	 */
	constructor(data) {
		super(data);

		this.group = data?.group ?? "Item";
	}
}

module.exports = Item;