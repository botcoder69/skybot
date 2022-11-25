
const { MinionFuel } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionFuel(
	{
		search: [`foul flesh`, `foulflesh`],
		group: "Minion Fuel",
		name: `Foul Flesh`,
		keyName: "foulFlesh",
		description: "",
		rarity: "Rare",
		emoji: {
			name: `<:Charcoal:894483281788157993>`,
			url: `https://cdn.discordapp.com/emojis/894483281788157993.png`
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
			duration: 7200,
			// the multiplier this fuel will give your minion (1 * multiplier)
			multiplier: 1,
			// the speed in percent this fuel will give your minion (timeBetweenActions = Math.floor(timeBetweenActions * (speed / 100)))
			speed: 90,
			// Will the fuel be takeable from the minion after it is placed? Equals to false when not specified
			reclaimable: false
		},
		includeInParsing: false
	}
);