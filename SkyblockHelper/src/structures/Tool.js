
const { EquipableItem } = require('./EquipableItem');

class Tool extends EquipableItem {
	constructor(data) {
		super(data);

		this.group = `Tool`;

		this.tool = data.tool;
	}
}

module.exports = Tool;