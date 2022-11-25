
const { MinionFuel } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionFuel(
	{
		search: [`tasty cheese`, `tastycheese`],
		group: "Minion Fuel",
		name: `Tasty Cheese`,
		keyName: "tastyCheese",
		description: "",
		rarity: "Rare",
		emoji: {
			name: `<:Tasty_Cheese:894483282119516180>`,
			url: `https://cdn.discordapp.com/emojis/894483282119516180.png`
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
			duration: 3600,
			// the multiplier this fuel will give your minion (1 * multiplier)
			multiplier: 2,
			// the speed in percent this fuel will give your minion (timeBetweenActions = Math.floor(timeBetweenActions * (speed / 100)))
			speed: 0,
			// Will the fuel be takeable from the minion after it is placed? Equals to false when not specified
			reclaimable: false
		},
		includeInParsing: false
	}
);