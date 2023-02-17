
const { SelectMenuOptionBuilder } = require('@discordjs/builders');

class MultiSelectMenuConfirmationOption extends SelectMenuOptionBuilder {
	constructor(data) {
		super(data);

		/**
		 * @type {MultiSelectMenuConfirmationOption[]}
		 */
		this.childOptions = [];
	}

	/**
	 * @private
	 */
	normalizeOptions() {
		this.childOptions = this.childOptions.flat(Infinity);
	}

	setChildOptions(...options) {
		this.childOptions = options;
		this.normalizeOptions();

		return this;
	}

	addChildOptions(...options) {
		this.childOptions.push(options);
		this.normalizeOptions();

		return this;
	}
}

module.exports = MultiSelectMenuConfirmationOption;