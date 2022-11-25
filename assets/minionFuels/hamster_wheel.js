
const { MinionFuel } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionFuel(
	{
		search: [`hamster wheel`, `hamsterwheel`],
		group: "Minion Fuel",
		name: `Hamster Wheel`,
		keyName: "hamsterWheel",
		description: "",
		rarity: "Rare",
		emoji: {
			name: `<:Hamster_Wheel:894483282073378816>`,
			url: `https://cdn.discordapp.com/emojis/894483282073378816.png`
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
			duration: 86400,
			// the multiplier this fuel will give your minion (1 * multiplier)
			multiplier: 1,
			// the speed in percent this fuel will give your minion (timeBetweenActions = Math.floor(timeBetweenActions * (speed / 100)))
			speed: 50,
			// Will the fuel be takeable from the minion after it is placed? Equals to false when not specified
			reclaimable: false
		},
		includeInParsing: false
	}
);