const fs = require('fs');
const SkyblockHelperError = require("../errors/SkyblockHelperError");

module.exports = class LootTable {
	/**
	 * 
	 * @param {String} loot_table_name A json file in your ./loot_tables folder. Returns an array in the order [display_name, skyblock_id, emoji_ID, amount]
	 * @returns {(String | Number)[]}
	 */
	constructor(loot_table_name) {
		const throwError = {
			missing: {
				/**
				 * @param {String} loot_table 
				 */
				pools: (loot_table) => {
					throw new SkyblockHelperError(`Loot Table | TypeError | Value of "pools" in loot table ${loot_table}.json is missing!`, `LOOT_TABLE_POOLS_MISSING`);
				},
				entries: (loot_table) => {
					throw new SkyblockHelperError(`Loot Table | TypeError | Value of "entries" in loot table ${loot_table}.json is missing!,`, `LOOT_TABLE_ENTRIES_MISSING`);
				},
				entry: {
					type: (loot_table) => {
						throw new SkyblockHelperError(`Loot Table | TypeError | Value of "type" in loot table ${loot_table}.json is missing!`, );
					},
					name: {
						display_name: (loot_table) => {
							throw new SkyblockHelperError(`Loot Table | TypeError | Value of "display_name" in loot table ${loot_table}.json is missing!`);
						},
						skyblock_id: (loot_table) => {
							throw new SkyblockHelperError(`Loot Table | TypeError | Value of "skyblock_id" in loot table ${loot_table}.json is missing!`);
						}
					},
					weight: (loot_table) => {
						throw new SkyblockHelperError(`Loot Table | TypeError | Value of "weight" in loot table ${loot_table}.json is missing!`);
					},
					functions: {
						function: (loot_table) => {
							throw new SkyblockHelperError(`Loot Table | TypeError | Value of "function" in loot table ${loot_table}.json is missing!`);
						},
						count: {
							min: (loot_table) => {
								throw new SkyblockHelperError(`Loot Table | TypeError | Value of "min" in loot table ${loot_table}.json is missing!`);
							},
							max: (loot_table) => {
								throw new SkyblockHelperError(`Loot Table | TypeError | Value of "max" in loot table ${loot_table}.json is missing!`);
							}
						}
					}
				}
			},
			unparsable: {
				pools: (loot_table) => {
					throw new SkyblockHelperError(`Loot Table | RangeError | Value of "pools" in loot table ${loot_table}.json is not valid!`);
				},
				entry: {
					type: (loot_table) => {
						throw new SkyblockHelperError(`Loot Table | RangeError | Value of "type" in loot table ${loot_table}.json is not valid!`);
					},
					weight: (loot_table) => {
						throw new SkyblockHelperError(`Loot Table | RangeError | Value of "weight" in loot table ${loot_table}.json is not valid!`);
					},
					functions: {
						function: (loot_table) => {
							throw new SkyblockHelperError(`Loot Table | RangeError | Value of "function" in loot table ${loot_table}.json is not valid!`);
						},
						count: {
							min: (loot_table) => {
								throw new SkyblockHelperError(`Loot Table | RangeError | Value of "min" in loot table ${loot_table}.json is not valid!`);
							},
							max: (loot_table) => {
								throw new SkyblockHelperError(`Loot Table | RangeError | Value of "max" in loot table ${loot_table}.json is not valid!`);
							}
						}
					}
				}
			}
		};
		const lt_file = fs.readdirSync("./loot_tables").filter(file => file === `${loot_table_name}.json`);
		if (!lt_file) throw new SkyblockHelperError(`Loot Table | File error | ${loot_table_name}.json cannot be found in your ./loot_tables folder!`);
		const [loot_table_file] = lt_file;
		const loot_table = require(`./loot_tables/${loot_table_file}`);
		if (!loot_table.pools) {
			throwError.missing.pools(loot_table_file); 
		} else if (loot_table.pools.length !== 1) {
			throwError.unparsable.pools(loot_table_file);
		} else if (!loot_table.entries) {
			throwError.missing.entries(loot_table_file);
		}
		let allWeight = 0;
		const itemsArray = [];
		for (let allEntries = 0; allEntries < loot_table.pools[0].entries.length; allEntries++) {
			const the_loot_table = loot_table.pools[0].entries[allEntries];
			if (!the_loot_table.type) {
				throwError.missing.entry.type(loot_table_file);
			} else if (!the_loot_table.name.display_name) {
				throwError.missing.entry.name.display_name(loot_table_file);
			} else if (!the_loot_table.name.skyblock_id) {
				throwError.missing.entry.name.skyblock_id(loot_table_file);
			} else if (!the_loot_table.weight) {
				throwError.missing.entry.weight(loot_table_file);
			} else if (typeof the_loot_table.weight !== "number") {
				throwError.unparsable.entry.weight(loot_table_file);
			} else if (the_loot_table.type !== "item") {
				throwError.unparsable.entry.type(loot_table_file);
			}

			let minimumCollectable, maximumCollectable;
			for (let functionEntries = 0; functionEntries < the_loot_table.functions.length; functionEntries++) {
				const ltfunction = the_loot_table.functions[functionEntries];
				if (!ltfunction.function) {
					throwError.missing.entry.functions.function(loot_table_file);
				} else if (ltfunction.function !== "set_count") {
					throwError.unparsable.entry.functions.function(loot_table_file);
				} else if (!ltfunction.count.min) {
					throwError.missing.entry.functions.count.min(loot_table_file);
				} else if (!ltfunction.count.max) {
					throwError.missing.entry.functions.count.max(loot_table_file);
				} else if (typeof ltfunction.count.min !== "number") {
					throwError.unparsable.entry.functions.count.min(loot_table_file);
				} else if (typeof ltfunction.count.max !== "number") {
					throwError.unparsable.entry.functions.count.max(loot_table_file);
				}
				minimumCollectable = ltfunction.count.min;
				maximumCollectable = ltfunction.count.max;
			}

			const { display_name, skyblock_id, weight } = the_loot_table.name;

			allWeight += the_loot_table.weight;
			itemsArray.push([display_name, skyblock_id, minimumCollectable, maximumCollectable, weight]);
		}
		
		let foundState = false, 
			totalNumber = 0;
		const rng = Math.floor(Math.random() * allWeight) + 1;
		for (let loop = 0; loop < itemsArray.length; loop++) {
			const [displayName, skyblockID, minCollectable, maxCollectable, chance] = itemsArray[loop];
			if (rng < (chance + totalNumber)) {
				const collectableRNG = Math.floor(Math.random() * maxCollectable) + minCollectable,
					message = displayName,
					keyID = skyblockID;

				foundState = true;
				return [message, keyID, collectableRNG];
			} else {
				totalNumber += chance;
			}
		}
	}
};

