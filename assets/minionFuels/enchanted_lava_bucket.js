
const { MinionFuel } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionFuel(
	{
		search: [`enchanted lava bucket`, `enchantedlavabucket`, `enchanted lava`],
		group: "Minion Fuel",
		name: `Enchanted Lava Bucket`,
		keyName: "enchantedLavaBucket",
		description: "Originally planned as a public item, this item wasn't craftable because Skybot had no items for crafting this item, so this stayed as a Developer Item eversince. Anyways, the addition of \"loot boxes\" allowed me to add this item, since loot boxes can be gained by Fishing or Adventure!",
		rarity: "Epic",
		emoji: {
			name: `<:Enchanted_Lava_Bucket:894483282253713429>`,
			url: `https://cdn.discordapp.com/emojis/894483282253713429.png`
		},
		NPC: {
			sell: {
				sellable: false,
				price: 0
			},
			buy: {
				buyable: false,
				price: 0
			}
		},
		sellall: {
			included: false,
		},
		minionFuel: {
		// the duration this fuel will last in seconds
			duration: Infinity,
			// the multiplier this fuel will give your minion (1 * multiplier)
			multiplier: 1,
			// the speed in percent this fuel will give your minion (timeBetweenActions = Math.floor(timeBetweenActions * (speed / 100)))
			speed: 25,
			// Will the fuel be takeable from the minion after it is placed? Equals to false when not specified
			reclaimable: true
		},
		includeInParsing: true
	}
);