function compact(compactLvl, amount, enchLvls, maxStorage, keyName) {
	// eslint-disable-next-line no-unused-vars
	const [enchLvl1, enchLvl2, enchLvl3, enchLvl4] = enchLvls;

	let itemAmount = amount;

	if (compactLvl === 1) {
		// This means that there is no compacted form of the object, so the compact level is useless
		if (!enchLvl2) {
			const amountNow = itemAmount > maxStorage
				? maxStorage
				: itemAmount;
			return [
				[enchLvl1.name, enchLvl1.keyName, amountNow, keyName]
			];
		} else {
			// Extract the amount of enchanted items.
			let lvl2EnchItems = Math.floor(amount / 160);
			// Get the amount of items left.
			itemAmount %= 160;

			// If the amounts of both items are still greater than the max storage
			if ((itemAmount + lvl2EnchItems) > maxStorage) {
				// Set an amount for all of the items to remove
				let amountToRemove = (itemAmount + lvl2EnchItems) - maxStorage;

				if (amountToRemove >= itemAmount) {
					amountToRemove -= itemAmount;
					itemAmount = 0;
					lvl2EnchItems -= amountToRemove;
				} else {
					itemAmount -= amountToRemove;
					amountToRemove = 0;
				}
			}

			const data = [];

			if (itemAmount >= 1) {
				data.push([enchLvl1.name, enchLvl1.keyName, itemAmount, keyName]);
			}

			if (lvl2EnchItems >= 1) {
				data.push([enchLvl2.name, enchLvl2.keyName, lvl2EnchItems, keyName]);
			}

			return data;
		}
	} else if (compactLvl === 2) {
		// ERROR
	}
}

module.exports = compact;