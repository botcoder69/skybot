
const { MinionFuel } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionFuel(
	{
		search: [`solar panel`, `solarpanel`],
		group: "Minion Fuel",
		name: `Solar Panel`,
		keyName: "solarPanel",
		description: "",
		rarity: "Uncommon",
		emoji: {
			name: `<:Solar_Panel:894483282220183552>`,
			url: `https://cdn.discordapp.com/emojis/894483282220183552.png`
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
			duration: 1,
			// the multiplier this fuel will give your minion (1 * multiplier)
			multiplier: 1,
			// the speed in percent this fuel will give your minion (timeBetweenActions = Math.floor(timeBetweenActions * (speed / 100)))
			speed: 10,
			// Will the fuel be takeable from the minion after it is placed? Equals to false when not specified
			reclaimable: true
		},
		// The solar panel will be included when we have a "night-and-day" cycle update. Right now it will just stay in the game's files, unused...
		includeInParsing: false
	}
);