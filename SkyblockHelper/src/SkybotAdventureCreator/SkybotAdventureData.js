
class SkybotAdventureData {
	constructor() {
		this.label = null;

		this.description = null;

		this.value = null;

		this.default = null;

		this.info = null;

		this.requirements = true;
	}

	setLabel(label) {
		this.label = label;

		return this;
	}

	setDescription(description) {
		this.description = description;

		return this;
	}

	setValue(value) {
		this.value = value;

		return this;
	}

	setDefault(value) {
		this.default = value;

		return this;
	}

	setInfo(info) {
		this.info = info;

		return this;
	}

	setUnlockRequirements(requirements) {
		this.requirements = requirements;

		return this;
	}
}

module.exports = SkybotAdventureData;